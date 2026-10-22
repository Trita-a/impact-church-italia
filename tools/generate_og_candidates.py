import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

artifact_dir = r"C:/Users/Administrator/.gemini/antigravity/brain/d7882a3e-e2b2-4a70-86a3-8cbf32c24c10"
os.makedirs(artifact_dir, exist_ok=True)

# 1. Load and process the official logo
logo_raw_path = r"C:/Users/Administrator/.gemini/antigravity/brain/d7882a3e-e2b2-4a70-86a3-8cbf32c24c10/.user_uploaded/media_1792674045282_90d89014.png"
logo_raw = Image.open(logo_raw_path).convert("RGBA")
# Bbox: (163, 410, 861, 614)
cropped_logo = logo_raw.crop((163, 410, 861, 614)) # 698x204

# Generate two crisp versions of the logo:
# A) White Logo: Banner is solid white (698x118 parallelogram), "IMPACT" is cut-out (transparent so background shows or dark), and "CHURCH" is solid white.
# Let's create a logo where:
# - Banner background is WHITE
# - Inside banner, "IMPACT" is DARK (#0f172a)
# - "CHURCH" is WHITE (#ffffff)
def create_white_contrast_logo():
    arr = np.array(cropped_logo)
    alpha = arr[:, :, 3]

    poly_img = Image.new('L', cropped_logo.size, 0)
    draw = ImageDraw.Draw(poly_img)
    draw.polygon([(42, 0), (697, 0), (657, 118), (1, 118)], fill=255)
    poly_arr = np.array(poly_img)

    banner_bg_mask = (poly_arr > 128) & (alpha > 128)
    impact_letters_mask = (poly_arr > 128) & (alpha < 128)
    church_mask = (np.arange(204)[:, None] >= 120) & (alpha > 100)

    # Result image RGBA
    res = Image.new('RGBA', cropped_logo.size, (0, 0, 0, 0))
    res_arr = np.zeros((204, 698, 4), dtype=np.uint8)

    # Banner background -> White (255, 255, 255, 255)
    res_arr[banner_bg_mask] = [255, 255, 255, 255]
    # IMPACT letters -> Dark Navy (15, 23, 42, 255)
    res_arr[impact_letters_mask] = [15, 23, 42, 255]
    # CHURCH -> White (255, 255, 255, 255)
    res_arr[church_mask] = [255, 255, 255, 255]

    return Image.fromarray(res_arr, 'RGBA')

def create_gold_contrast_logo():
    arr = np.array(cropped_logo)
    alpha = arr[:, :, 3]

    poly_img = Image.new('L', cropped_logo.size, 0)
    draw = ImageDraw.Draw(poly_img)
    draw.polygon([(42, 0), (697, 0), (657, 118), (1, 118)], fill=255)
    poly_arr = np.array(poly_img)

    banner_bg_mask = (poly_arr > 128) & (alpha > 128)
    impact_letters_mask = (poly_arr > 128) & (alpha < 128)
    church_mask = (np.arange(204)[:, None] >= 120) & (alpha > 100)

    res_arr = np.zeros((204, 698, 4), dtype=np.uint8)
    # Banner background -> Gold Accent (219, 165, 129, 255)
    res_arr[banner_bg_mask] = [219, 165, 129, 255]
    # IMPACT letters -> Deep Slate (15, 23, 42, 255)
    res_arr[impact_letters_mask] = [15, 23, 42, 255]
    # CHURCH -> Gold Accent (219, 165, 129, 255) or White (255, 255, 255, 255)
    res_arr[church_mask] = [255, 255, 255, 255]

    return Image.fromarray(res_arr, 'RGBA')

def create_all_white_logo():
    # Only letters: "IMPACT" white, banner dark subtle border, "CHURCH" white
    arr = np.array(cropped_logo)
    alpha = arr[:, :, 3]

    poly_img = Image.new('L', cropped_logo.size, 0)
    draw = ImageDraw.Draw(poly_img)
    draw.polygon([(42, 0), (697, 0), (657, 118), (1, 118)], fill=255)
    poly_arr = np.array(poly_img)

    banner_bg_mask = (poly_arr > 128) & (alpha > 128)
    impact_letters_mask = (poly_arr > 128) & (alpha < 128)
    church_mask = (np.arange(204)[:, None] >= 120) & (alpha > 100)

    res_arr = np.zeros((204, 698, 4), dtype=np.uint8)
    # Banner background -> Semi-transparent dark overlay with subtle outline
    res_arr[banner_bg_mask] = [255, 255, 255, 255]
    res_arr[impact_letters_mask] = [15, 23, 42, 255]
    res_arr[church_mask] = [255, 255, 255, 255]

    return Image.fromarray(res_arr, 'RGBA')

logo_white = create_white_contrast_logo()
logo_gold = create_gold_contrast_logo()

# Load Fonts
font_tagline = ImageFont.truetype('C:/Windows/Fonts/Inter-Bold-slnt=0.ttf', 20)
font_title_sub = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 30)
font_website = ImageFont.truetype('C:/Windows/Fonts/Inter-Regular-slnt=0.ttf', 20)
font_verse = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 22)
font_verse_ref = ImageFont.truetype('C:/Windows/Fonts/Inter-Regular-slnt=0.ttf', 18)

WIDTH, HEIGHT = 1200, 630

# =========================================================================
# CANDIDATE 1: Cinematic Dark Worship (hero-1.webp + Logo Bianco/Oro)
# =========================================================================
def build_candidate_1():
    bg = Image.open('images/hero-1.webp').convert('RGB')
    # Resize & Crop to 1200x630
    bg_ratio = bg.width / bg.height
    target_ratio = WIDTH / HEIGHT
    if bg_ratio > target_ratio:
        new_w = int(bg.height * target_ratio)
        left = (bg.width - new_w) // 2
        bg = bg.crop((left, 0, left + new_w, bg.height))
    else:
        new_h = int(bg.width / target_ratio)
        top = (bg.height - new_h) // 2
        bg = bg.crop((0, top, bg.width, top + new_h))
    bg = bg.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)

    # Dark gradient overlay
    overlay = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    d_overlay = ImageDraw.Draw(overlay)
    # Gradient from top to bottom + center vignette
    for y in range(HEIGHT):
        # Progress 0 to 1
        p = y / HEIGHT
        alpha = int(170 + 60 * abs(p - 0.45))
        d_overlay.line([(0, y), (WIDTH, y)], fill=(15, 23, 42, min(240, alpha)))
    
    # Add subtle central radial brightness
    radial = Image.new('L', (WIDTH, HEIGHT), 0)
    d_rad = ImageDraw.Draw(radial)
    d_rad.ellipse([(WIDTH//2 - 400, HEIGHT//2 - 250), (WIDTH//2 + 400, HEIGHT//2 + 250)], fill=60)
    radial = radial.filter(ImageFilter.GaussianBlur(100))
    
    # Composite overlay
    card = Image.alpha_composite(bg.convert('RGBA'), overlay)

    draw = ImageDraw.Draw(card)

    # Top Tagline Badge: "CHIESA EVANGELICA · CITTÀ DELLA PIEVE"
    tagline_text = "CHIESA EVANGELICA  ·  CITTÀ DELLA PIEVE"
    t_bbox = draw.textbbox((0, 0), tagline_text, font=font_tagline)
    t_w = t_bbox[2] - t_bbox[0]
    t_h = t_bbox[3] - t_bbox[1]
    badge_pad_x, badge_pad_y = 22, 9
    badge_x1 = (WIDTH - t_w) // 2 - badge_pad_x
    badge_y1 = 90
    badge_x2 = badge_x1 + t_w + badge_pad_x * 2
    badge_y2 = badge_y1 + t_h + badge_pad_y * 2
    
    # Draw badge background
    draw.rounded_rectangle([(badge_x1, badge_y1), (badge_x2, badge_y2)], radius=8,
                           fill=(17, 24, 39, 210), outline=(219, 165, 129, 140), width=1)
    draw.text(((WIDTH - t_w) // 2, badge_y1 + badge_pad_y - 2), tagline_text, fill=(245, 216, 195), font=font_tagline)

    # Center Logo: resize to width ~ 520px
    logo_target_w = 520
    scale = logo_target_w / logo_white.width
    logo_target_h = int(logo_white.height * scale)
    logo_scaled = logo_white.resize((logo_target_w, logo_target_h), Image.Resampling.LANCZOS)
    logo_x = (WIDTH - logo_target_w) // 2
    logo_y = 185
    card.alpha_composite(logo_scaled, (logo_x, logo_y))

    # Subtitle: "Fede · Speranza · Amore"
    sub_text = "Fede  ·  Speranza  ·  Amore"
    s_bbox = draw.textbbox((0, 0), sub_text, font=font_title_sub)
    s_w = s_bbox[2] - s_bbox[0]
    draw.text(((WIDTH - s_w) // 2, 385), sub_text, fill=(219, 165, 129), font=font_title_sub)

    # Decorative thin accent line
    line_w = 120
    draw.line([(WIDTH//2 - line_w//2, 450), (WIDTH//2 + line_w//2, 450)], fill=(219, 165, 129, 160), width=2)

    # Website URL
    url_text = "impactchurchitalia.com"
    u_bbox = draw.textbbox((0, 0), url_text, font=font_website)
    u_w = u_bbox[2] - u_bbox[0]
    draw.text(((WIDTH - u_w) // 2, 485), url_text, fill=(255, 255, 255, 220), font=font_website)

    out_path = os.path.join(artifact_dir, "candidate_og_1_worship.jpg")
    card.convert('RGB').save(out_path, quality=92, optimize=True)
    print("Candidate 1 saved:", out_path)

# =========================================================================
# CANDIDATE 2: Editorial Frosted Glass Card (Box elegante centrale)
# =========================================================================
def build_candidate_2():
    bg = Image.open('images/hero-1.webp').convert('RGB')
    bg = bg.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    bg = bg.filter(ImageFilter.GaussianBlur(10)) # Artistic blur for depth

    # Create base card
    card = bg.convert('RGBA')
    draw = ImageDraw.Draw(card)

    # Dark background tint
    dim = Image.new('RGBA', (WIDTH, HEIGHT), (11, 18, 32, 170))
    card = Image.alpha_composite(card, dim)
    draw = ImageDraw.Draw(card)

    # Frosted glass card in center
    box_w, box_h = 940, 480
    box_x1 = (WIDTH - box_w) // 2
    box_y1 = (HEIGHT - box_h) // 2
    box_x2 = box_x1 + box_w
    box_y2 = box_y1 + box_h

    # Floating container with gold border
    draw.rounded_rectangle([(box_x1, box_y1), (box_x2, box_y2)], radius=24,
                           fill=(15, 23, 42, 225), outline=(219, 165, 129, 180), width=2)

    # Inside card: Tagline
    tagline_text = "CHIESA EVANGELICA  ·  CITTÀ DELLA PIEVE"
    t_bbox = draw.textbbox((0, 0), tagline_text, font=font_tagline)
    t_w = t_bbox[2] - t_bbox[0]
    draw.text(((WIDTH - t_w) // 2, box_y1 + 45), tagline_text, fill=(219, 165, 129), font=font_tagline)

    # Logo (Gold accent banner version)
    logo_target_w = 480
    scale = logo_target_w / logo_gold.width
    logo_target_h = int(logo_gold.height * scale)
    logo_scaled = logo_gold.resize((logo_target_w, logo_target_h), Image.Resampling.LANCZOS)
    logo_x = (WIDTH - logo_target_w) // 2
    logo_y = box_y1 + 110
    card.alpha_composite(logo_scaled, (logo_x, logo_y))

    # Scripture Verse
    v_text = "«Conoscerete la verità e la verità vi farà liberi»"
    v_bbox = draw.textbbox((0, 0), v_text, font=font_verse)
    v_w = v_bbox[2] - v_bbox[0]
    draw.text(((WIDTH - v_w) // 2, box_y1 + 290), v_text, fill=(255, 255, 255, 230), font=font_verse)

    ref_text = "— Giovanni 8:32 —"
    r_bbox = draw.textbbox((0, 0), ref_text, font=font_verse_ref)
    r_w = r_bbox[2] - r_bbox[0]
    draw.text(((WIDTH - r_w) // 2, box_y1 + 330), ref_text, fill=(219, 165, 129, 230), font=font_verse_ref)

    # Website at bottom of card
    url_text = "impactchurchitalia.com"
    u_bbox = draw.textbbox((0, 0), url_text, font=font_website)
    u_w = u_bbox[2] - u_bbox[0]
    draw.text(((WIDTH - u_w) // 2, box_y1 + 400), url_text, fill=(255, 255, 255, 180), font=font_website)

    out_path = os.path.join(artifact_dir, "candidate_og_2_frosted.jpg")
    card.convert('RGB').save(out_path, quality=92, optimize=True)
    print("Candidate 2 saved:", out_path)

# =========================================================================
# CANDIDATE 3: Clean Minimal Luxury (Deep Slate + Radial Glow + Logo Grande)
# =========================================================================
def build_candidate_3():
    # Gradient from Deep Slate #0b1120 to Midnight #020617
    card = Image.new('RGBA', (WIDTH, HEIGHT), (11, 17, 32, 255))
    draw = ImageDraw.Draw(card)

    # Background subtle gradient
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(11 * (1 - ratio) + 2 * ratio)
        g = int(17 * (1 - ratio) + 6 * ratio)
        b = int(32 * (1 - ratio) + 23 * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b, 255))

    # Golden ambient glow in center
    glow = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    d_glow = ImageDraw.Draw(glow)
    d_glow.ellipse([(WIDTH//2 - 450, HEIGHT//2 - 250), (WIDTH//2 + 450, HEIGHT//2 + 250)], fill=(219, 165, 129, 38))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    card = Image.alpha_composite(card, glow)
    draw = ImageDraw.Draw(card)

    # Subtle outer frame border
    draw.rectangle([(24, 24), (WIDTH - 24, HEIGHT - 24)], outline=(219, 165, 129, 60), width=1)
    draw.rectangle([(28, 28), (WIDTH - 28, HEIGHT - 28)], outline=(255, 255, 255, 20), width=1)

    # Top Tagline
    tagline_text = "CHIESA EVANGELICA  ·  CITTÀ DELLA PIEVE"
    t_bbox = draw.textbbox((0, 0), tagline_text, font=font_tagline)
    t_w = t_bbox[2] - t_bbox[0]
    draw.text(((WIDTH - t_w) // 2, 110), tagline_text, fill=(219, 165, 129), font=font_tagline)

    # Big Logo (Width ~ 580px)
    logo_target_w = 580
    scale = logo_target_w / logo_white.width
    logo_target_h = int(logo_white.height * scale)
    logo_scaled = logo_white.resize((logo_target_w, logo_target_h), Image.Resampling.LANCZOS)
    logo_x = (WIDTH - logo_target_w) // 2
    logo_y = 195
    card.alpha_composite(logo_scaled, (logo_x, logo_y))

    # Subtitle: "Fede · Speranza · Amore"
    sub_text = "Fede  ·  Speranza  ·  Amore"
    s_bbox = draw.textbbox((0, 0), sub_text, font=font_title_sub)
    s_w = s_bbox[2] - s_bbox[0]
    draw.text(((WIDTH - s_w) // 2, 420), sub_text, fill=(255, 255, 255, 240), font=font_title_sub)

    # URL with glowing pill at bottom
    url_text = "impactchurchitalia.com"
    u_bbox = draw.textbbox((0, 0), url_text, font=font_website)
    u_w = u_bbox[2] - u_bbox[0]
    pill_pad_x, pill_pad_y = 24, 8
    pill_x1 = (WIDTH - u_w) // 2 - pill_pad_x
    pill_y1 = 495
    pill_x2 = pill_x1 + u_w + pill_pad_x * 2
    pill_y2 = pill_y1 + u_bbox[3] - u_bbox[1] + pill_pad_y * 2
    draw.rounded_rectangle([(pill_x1, pill_y1), (pill_x2, pill_y2)], radius=20,
                           fill=(17, 24, 39, 230), outline=(219, 165, 129, 140), width=1)
    draw.text(((WIDTH - u_w) // 2, pill_y1 + pill_pad_y - 2), url_text, fill=(219, 165, 129), font=font_website)

    out_path = os.path.join(artifact_dir, "candidate_og_3_minimal_luxury.jpg")
    card.convert('RGB').save(out_path, quality=92, optimize=True)
    print("Candidate 3 saved:", out_path)

if __name__ == '__main__':
    build_candidate_1()
    build_candidate_2()
    build_candidate_3()
    print("All 3 candidates built successfully!")
