import os
from PIL import Image

def convert_to_webp(directory):
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(directory, filename)
            filename_no_ext = os.path.splitext(filename)[0]
            output_path = os.path.join(directory, filename_no_ext + ".webp")
            
            try:
                with Image.open(filepath) as im:
                    im.save(output_path, "WEBP", quality=85)
                    print(f"Converted {filename} to {output_path}")
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    convert_to_webp("c:/Users/Administrator/Desktop/Sito chiesa/images")
