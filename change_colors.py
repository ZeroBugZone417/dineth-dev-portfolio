import os

file_path = "d:/my tool/portfolio/style.css"

with open(file_path, "r", encoding="utf-8") as file:
    content = file.read()

# Replace root variables
content = content.replace("--bg-color: #0d1117;", "--bg-color: #060e14;")
content = content.replace("--bg-secondary: #161b22;", "--bg-secondary: #0d1926;")
content = content.replace("rgba(22, 27, 34, 0.6)", "rgba(13, 25, 38, 0.6)")
content = content.replace("--accent-color: #58a6ff;", "--accent-color: #10b981;")
content = content.replace("rgba(88, 166, 255, 0.3)", "rgba(16, 185, 129, 0.3)")
content = content.replace("linear-gradient(135deg, #58a6ff 0%, #bc8cff 100%)", "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)")

# Replace scattered RGB and HEX values
content = content.replace("rgba(88, 166, 255,", "rgba(16, 185, 129,")
content = content.replace("rgba(188, 140, 255,", "rgba(14, 165, 233,")
content = content.replace("rgba(88,166,255,", "rgba(16,185,129,")
content = content.replace("rgba(188,140,255,", "rgba(14,165,233,")
content = content.replace("#bc8cff", "#0ea5e9")

with open(file_path, "w", encoding="utf-8") as file:
    file.write(content)
print("Colors perfectly replaced!")
