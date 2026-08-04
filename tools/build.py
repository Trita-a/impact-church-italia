import os
import re

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
TEMPLATES_EN_DIR = os.path.join(TEMPLATES_DIR, 'en')

# Files to process
# Files to process (404.html excluded as it has custom layout)
FILES_IT = [
    'index.html', 'chi-siamo.html', 'partecipa.html', 'live.html', 
    'donazioni.html', 'privacy.html'
]

FILES_EN = [
    'en/index.html', 'en/about-us.html', 'en/get-involved.html', 
    'en/live.html', 'en/giving.html', 'en/privacy.html'
]

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def get_template(name, lang='it'):
    path = os.path.join(TEMPLATES_EN_DIR if lang == 'en' else TEMPLATES_DIR, name)
    if not os.path.exists(path):
        print(f"Warning: Template {path} not found")
        return ""
    return read_file(path)

def fix_security_links(html):
    def replacer(match):
        tag = match.group(0)
        if 'rel=' in tag:
            if 'noopener' not in tag or 'noreferrer' not in tag:
                return re.sub(r'rel=["\'](.*?)["\']', r'rel="\1 noopener noreferrer"', tag)
            return tag
        return tag.replace('target="_blank"', 'target="_blank" rel="noopener noreferrer"')
    return re.sub(r'<a[^>]+target="_blank"[^>]*>', replacer, html)

# Helper unused in new logic below but kept for reference or removed


PAGE_MAP_IT_TO_EN = {
    'index.html': 'en/index.html',
    'chi-siamo.html': 'en/about-us.html',
    'partecipa.html': 'en/get-involved.html',
    'live.html': 'en/live.html',
    'donazioni.html': 'en/giving.html',
    'privacy.html': 'en/privacy.html'
}

PAGE_MAP_EN_TO_IT = {
    'en/index.html': '../index.html',
    'en/about-us.html': '../chi-siamo.html',
    'en/get-involved.html': '../partecipa.html',
    'en/live.html': '../live.html',
    'en/giving.html': '../donazioni.html',
    'en/privacy.html': '../privacy.html'
}

def inject_section(html, start_marker, end_marker, content):
    pattern = re.compile(f'({re.escape(start_marker)})(.*?)({re.escape(end_marker)})', re.DOTALL)
    if not pattern.search(html):
        return html
    return pattern.sub(f'\\1\n{content}\n\\3', html)

def process_file(filename, lang='it'):
    filepath = os.path.join(BASE_DIR, filename)
    if not os.path.exists(filepath):
        print(f"Skipping missing file: {filename}")
        return

    print(f"Processing {filename}...")
    content = read_file(filepath)

    # First, cleanup any legacy duplicated closing tags from previous buggy builds
    content = re.sub(r'</header>\s*</header>', r'</header>', content)
    content = re.sub(r'</footer>\s*</footer>', r'</footer>', content)
    content = re.sub(r'</nav>\s*</nav>', r'</nav>', content)

    # Determine target language URL for the language switcher
    if lang == 'it':
        target_lang_url = PAGE_MAP_IT_TO_EN.get(filename, 'en/index.html')
    else:
        target_lang_url = PAGE_MAP_EN_TO_IT.get(filename, '../index.html')

    # 1. Inject Head Common
    head_common = get_template('head-common.html', lang)
    if head_common and '<!-- HEAD_COMMON -->' in content and '<!-- /HEAD_COMMON -->' in content:
        content = inject_section(content, '<!-- HEAD_COMMON -->', '<!-- /HEAD_COMMON -->', head_common)

    # 2. Inject Preloader
    preloader_content = get_template('preloader.html', lang)
    if preloader_content:
        if '<!-- PRELOADER -->' in content and '<!-- /PRELOADER -->' in content:
            content = inject_section(content, '<!-- PRELOADER -->', '<!-- /PRELOADER -->', preloader_content)
        elif '<!-- Cinematic Preloader -->' in content:
            content = re.sub(r'<!--\s*Cinematic Preloader\s*-->.*?<div id="preloader">.*?</div>\s*(?=<!--\s*HEADER|<!--\s*=+?\s*HEADER)', f'<!-- PRELOADER -->\n{preloader_content}\n<!-- /PRELOADER -->\n', content, flags=re.DOTALL)

    # 3. Inject Header with page-specific lang switcher link
    header_content = get_template('header.html', lang)
    if header_content:
        # Replace lang switch link in header template
        header_content = re.sub(r'href=["\'][^"\']*["\'](\s+class=["\']lang-switch["\'])', f'href="{target_lang_url}"\\1', header_content)
        
        if '<!-- HEADER -->' in content and '<!-- /HEADER -->' in content:
            content = inject_section(content, '<!-- HEADER -->', '<!-- /HEADER -->', header_content)
        else:
            content = re.sub(r'<!--\s*=+?\s*HEADER\s*=+?\s*-->.*?</header>(\s*</header>)?', f'<!-- HEADER -->\n{header_content}\n<!-- /HEADER -->', content, flags=re.DOTALL)

    # 4. Inject Footer
    footer_content = get_template('footer.html', lang)
    if footer_content:
        if '<!-- FOOTER -->' in content and '<!-- /FOOTER -->' in content:
            content = inject_section(content, '<!-- FOOTER -->', '<!-- /FOOTER -->', footer_content)
        else:
            content = re.sub(r'<!--\s*=+?\s*FOOTER.*?-->.*?</footer>(\s*</footer>)?', f'<!-- FOOTER -->\n{footer_content}\n<!-- /FOOTER -->', content, flags=re.DOTALL)

    # 5. Inject Mobile Nav with page-specific lang switcher link
    nav_content = get_template('mobile-nav.html', lang)
    if nav_content:
        # Replace lang switch link in mobile nav template
        nav_content = re.sub(r'href=["\'][^"\']*["\'](\s+class=["\']lang-switch-mobile["\'])', f'href="{target_lang_url}"\\1', nav_content)
        
        if '<!-- MOBILE_NAV -->' in content and '<!-- /MOBILE_NAV -->' in content:
            content = inject_section(content, '<!-- MOBILE_NAV -->', '<!-- /MOBILE_NAV -->', nav_content)
        else:
            content = re.sub(r'<!--\s*Mobile Navigation Overlay\s*-->.*?</nav>(\s*</nav>)?', f'<!-- MOBILE_NAV -->\n{nav_content}\n<!-- /MOBILE_NAV -->', content, flags=re.DOTALL)

    # 6. Inject Scripts Common
    scripts_common = get_template('scripts-common.html', lang)
    if scripts_common and '<!-- SCRIPTS_COMMON -->' in content and '<!-- /SCRIPTS_COMMON -->' in content:
        content = inject_section(content, '<!-- SCRIPTS_COMMON -->', '<!-- /SCRIPTS_COMMON -->', scripts_common)

    # 7. Fix Security
    content = fix_security_links(content)

    write_file(filepath, content)

def main():
    print("Starting Build Process...")
    
    # Process Italian Files
    for f in FILES_IT:
        process_file(f, 'it')

    # Process English Files
    for f in FILES_EN:
        process_file(f, 'en')
    
    print("Build Complete.")

if __name__ == "__main__":
    main()


