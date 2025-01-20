# Install ImageMagick if not already installed
# Download from: https://imagemagick.org/script/download.php#windows

# Optimize background image
magick images/bg.png -strip -quality 85 -resize 1920x1080 images/bg-optimized.png

# Optimize logo
magick images/logo.jpg -strip -quality 85 -resize 80x80 images/logo-optimized.jpg

Write-Host "Images have been optimized!"
