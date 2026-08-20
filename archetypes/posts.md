---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ now.Format "2006-01-02" }}
# obrigatório: "codigo", "fora", ou os dois quando o post for os dois assuntos
categorias: ["codigo"]
tags: []
resumo: ""
draft: true
---
