# PowerShell script to optimize website for GitHub Pages

# Install required npm packages if not already installed
npm install -g html-minifier terser clean-css-cli

# Minify HTML files
Get-ChildItem -Filter "*.html" | ForEach-Object {
    html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true -o "$($_.BaseName).min.html" $_.FullName
    Move-Item "$($_.BaseName).min.html" $_.FullName -Force
}

# Minify CSS files
Get-ChildItem -Path "css" -Filter "*.css" | ForEach-Object {
    cleancss -o "$($_.DirectoryName)\$($_.BaseName).min.css" $_.FullName
    Move-Item "$($_.DirectoryName)\$($_.BaseName).min.css" $_.FullName -Force
}

# Minify JavaScript files
Get-ChildItem -Path "js" -Filter "*.js" | ForEach-Object {
    terser $_.FullName -c -m -o "$($_.DirectoryName)\$($_.BaseName).min.js"
    Move-Item "$($_.DirectoryName)\$($_.BaseName).min.js" $_.FullName -Force
}

Write-Host "Website optimization complete!"
