#!/usr/bin/env bash
#
# Redimensiona fotos antes de elas entrarem no repositorio.
#
#   scripts/foto.sh ~/fotos/viagem/*.jpg content/posts/nome-da-viagem/
#
# Git nunca esquece: uma foto de 8 MB commitada por engano fica no
# historico para sempre. A disciplina precisa estar na porta de entrada.
#
# Usa Pillow (Python) em vez de ImageMagick: este ambiente nao tem
# ImageMagick instalado nem sudo disponivel para instalar. Pillow 9.0.1
# ja vem com o Python 3 do sistema.

set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "uso: $0 <foto> [foto...] <pasta-do-post>" >&2
  exit 1
fi

destino="${!#}"
fotos=("${@:1:$#-1}")

if [ ! -d "$destino" ]; then
  echo "erro: '$destino' nao e um diretorio" >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "erro: python3 nao encontrado" >&2
  exit 1
fi

for foto in "${fotos[@]}"; do
  nome="$(basename "${foto%.*}" | tr '[:upper:] _' '[:lower:]--')"
  saida="$destino/$nome.jpg"
  python3 - "$foto" "$saida" <<'PYEOF'
import sys
from PIL import Image, ImageOps

origem, destino = sys.argv[1], sys.argv[2]

img = Image.open(origem)
img = ImageOps.exif_transpose(img)  # aplica a rotacao do EXIF antes de tudo
if img.mode != "RGB":
    img = img.convert("RGB")

img.thumbnail((2000, 2000))  # so reduz, nunca amplia; preserva proporcao

# save() sem exif=... descarta todos os metadados, inclusive GPS.
img.save(destino, "JPEG", quality=82)
PYEOF
  printf '%-40s -> %s (%s)\n' "$(basename "$foto")" "$saida" "$(du -h "$saida" | cut -f1)"
done
