---
title: "Por que sua fila do Redis está mentindo"
date: 2026-07-02
categorias: ["codigo"]
tags: ["redis", "filas"]
resumo: "Todo mundo trata LPUSH como se fosse uma garantia. Não é."
draft: false
---

Uma fila no Redis parece simples até o primeiro worker morrer no meio do
processamento. `LPUSH` coloca o item na lista e `RPOP` tira. O problema é o
intervalo entre tirar e terminar de processar.

```python
item = redis.rpop("fila")   # o item saiu da fila
processa(item)              # se o worker morrer aqui, o item sumiu
```

O item não está mais na fila e não foi processado. Ninguém sabe que ele
existiu. É por isso que existe `RPOPLPUSH`: o item sai de uma lista e entra
numa lista de processamento na mesma operação atômica.
