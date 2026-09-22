import { MigrationInterface, QueryRunner } from "typeorm";

const SEED_CATEGORIES = [
  {
    "id": 295,
    "name": "Electronics",
    "image": "https://imgs.search.brave.com/nowP2nNJnliEzm7kU220vEOZNo5zHdb1YBdJMeGgFSI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vaGlnaHRlY2gt/Z2FkZ2V0cy1lbGVj/dHJvbmljcy1mZWF0/dXJlZC1jeWJfMTE0/ODMyMi04MTI2Ni5q/cGc_c2VtdD1haXNf/dGVzdF9iJnc9NzQw/JnE9ODA",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:20:42.426Z"
  },
  {
    "id": 296,
    "name": "Clothing",
    "image": "https://imgs.search.brave.com/H_W8u6kZs-GDe-kA2EQfTBV7yMrLMzmPitEUFSt5Inc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8x/MS8yMi8xOS8wOC9o/YW5nZXJzLTE4NTAw/ODJfNjQwLmpwZw",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:23:56.011Z"
  },
  {
    "id": 297,
    "name": "Furniture",
    "image": "https://imgs.search.brave.com/E1_QNqZn0s8WrfsjjZpEae2t8dcLUEEMJE7EDi2MWYM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcHNk/L21vZGVybi1mdXJu/aXR1cmUtZGVjb3It/aXRlbXNfNTM4NzYt/MjA3MjE4LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:24:22.281Z"
  },
  {
    "id": 298,
    "name": "Footwear",
    "image": "https://imgs.search.brave.com/RuCNcF1g8rOH2hd8pd0BA8erxy420CmyawHUhbp7mWw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vc3R1bm5pbmct/Y29sbGVjdGlvbi1k/aXZlcnNlLWZvb3R3/ZWFyLWVhY2gtd2l0/aC1pdHMtb3duLXVu/aXF1ZS1kZXNpZ24t/c3R5bGVfOTI2MTk5/LTI2MzYxODkuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:25:01.502Z"
  },
  {
    "id": 299,
    "name": "Watches",
    "image": "https://imgs.search.brave.com/FSP5iwjqH4amZJxQUDtR8JTiqDE_DYYZJ2fzG7hjNps/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzEyLzY3Lzk4/LzM2MF9GXzMxMjY3/OTg5OV9SajFEeHdl/ckJBaFlKN05CdVZQ/d0lWTm81M1prRnU0/Vy5qcGc",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:25:26.453Z"
  },
  {
    "id": 300,
    "name": "Accessories",
    "image": "https://imgs.search.brave.com/4UojcLzKMZSTuX6ITH_DTOM-C7gWTX_NhJYXm0DcC3U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzgyLzJh/L2FhLzgyMmFhYWFj/ZDE0ZDIxNzk4ZWM0/NTIyYTU4NWQyMjk4/LmpwZw",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:26:47.099Z"
  },
  {
    "id": 301,
    "name": "Sports",
    "image": "https://imgs.search.brave.com/CwBQUNNyA-b_4U5Oa7Dbgzfg3epVvP74ggKG8lqhAZw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ0/ODA4MjIxL3Bob3Rv/L3Nwb3J0cy1lcXVp/cG1lbnQtd2l0aC1y/YWNrZXRzLWFuZC1i/YWxscy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9OXZUbWFS/cmZQUVRTVDJKOFVh/alEwUkdEYXJuUzgy/b0ZXcVh3V3ZLdmxi/OD0",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:27:20.066Z"
  },
  {
    "id": 302,
    "name": "Beauty",
    "image": "https://imgs.search.brave.com/Proc--4ep3DUrU5Tv65hnD7nybS5asx3O8INZAAq12A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIw/OTAyMDc1OC9waG90/by92YXJpb3VzLXNr/aW4tY2FyZS1ib3R0/bGVzLW9uLXBpbmst/YmFja2dyb3VuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/YldIRHNrVzlRWTJR/bW8xODlmYzFuaWl1/dlRhNmlwS0wtWHIw/V1dNQjhnTT0",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:27:52.706Z"
  },
  {
    "id": 303,
    "name": "Toys",
    "image": "https://imgs.search.brave.com/I5mSIdUmlaVPvB3okRVTQ0E--RiAPsKL02KHPz66eYo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjIv/OTY1LzM2My9zbWFs/bC9hLWNvbGxlY3Rp/b24tb2YtMTk3OXMt/ZmlzaGVyLXByaWNl/LXRveXMtc29mdC1h/bmltYWxzLWtpdHNj/aC12aW50YWdlLXJl/dHJvLWFuaW1hbHMt/Z2VuZXJhdGl2ZS1h/aS1waG90by5qcGc",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:28:27.044Z"
  },
  {
    "id": 304,
    "name": "Automotive",
    "image": "https://imgs.search.brave.com/mU6H9Z5_r_LfRMAOoEdj0ASDFkYKI_pqiUgZiO2ASuQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93aXNl/cGltLmNvbS9pbmR1/c3RyeS1zcGVjaWZp/Yy9jYXRlZ29yeS10/cmVlL2F1dG9tb3Rp/dmUtcGFydHNfaW50/ZXJpb3ItcGFydHNf/MS53ZWJw",
    "creation_at": "2026-08-17T05:30:00.207Z",
    "updated_at": "2026-08-26T05:29:00.531Z"
  }
];

const SEED_PRODUCTS = [
  {
    "id": 546,
    "title": "Ultra Speaker",
    "slug": "ultra-speaker-7",
    "description": "High-quality ultra speaker perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 22135,
    "images": [
      "https://imgs.search.brave.com/62rMKEBJJ_k1rCPj2E5jB_xGgaM4decT-LovU-0bAeE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDgwNDMxNTIyNjkt/NDIzZGJiYTRlN2Ux/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZhdXRv/PWZvcm1hdCZmaXQ9/Y3JvcCZpeGxpYj1y/Yi00LjEuMCZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE1ueDhhbUpzSlRJ/d2MzQmxZV3RsY254/bGJud3dmSHd3Zkh4/OE1BPT0"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:31:09.872Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 49
  },
  {
    "id": 630,
    "title": "Premium Tennis Racket",
    "slug": "premium-tennis-racket-91",
    "description": "High-quality premium tennis racket perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 29347,
    "images": [
      "https://imgs.search.brave.com/35AL8miJm8IbQotvKCEa7haRtrIY4ZqYWMc4MpE90QU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bWlzdGVydGVubmlz/LmNvbS9tZWRpYS9w/cm9kdWN0cy8yMDIz/LW1lZGlhLTEwLzIz/NjEwM19BLTYwMHg2/MDAuanBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:30:24.515Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 548,
    "title": "Durable Drone",
    "slug": "durable-drone-9",
    "description": "High-quality durable drone perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 47883,
    "images": [
      "https://imgs.search.brave.com/oT2I9V-O3xmQHANO7E6JiQFOa9iXqqAE1LYUvYIoi8w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9yb3Rv/cnJpb3QuY29tL2Nk/bi9zaG9wL2ZpbGVz/L0NpbmVtaW5pLTRz/LTIuNS1CX1QtREpJ/LTA0XzI1Tm92MjAy/NS0zLmpwZz92PTE3/NjQxMDY5OTMmd2lk/dGg9MTQ5Mw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T12:32:23.665Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 47
  },
  {
    "id": 674,
    "title": "Smart Rubiks Cube",
    "slug": "smart-rubiks-cube-135",
    "description": "High-quality smart rubiks cube perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 10634,
    "images": [
      "https://imgs.search.brave.com/yp16D7z-yhi8UMmW-WyfK5wVnouCceOlnfZnhaOCjeo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wYXJ0/aWN1bGEtdGVjaC5j/b20vY2RuL3Nob3Av/ZmlsZXMvR0NfWDNf/U0NSX1NPTFZFRF9M/Ml9QSE9ORV9BUFBf/MjAwMFgyMDAwXzEu/anBnP3Y9MTc3NjE2/MzIzNiZ3aWR0aD0x/OTQ2"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T12:32:23.665Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 49
  },
  {
    "id": 556,
    "title": "Luxury Jeans",
    "slug": "luxury-jeans-17",
    "description": "High-quality luxury jeans perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 45816,
    "images": [
      "https://imgs.search.brave.com/VWk_4Qa-cUFGfXiFkGbWVfxHEZrQrDtoWrQ1xigV5hg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzY0MDgwMTQ3L3Iv/aWwvN2ZkYzc5Lzgw/MTg3NDU1NzAvaWxf/MzAweDMwMC44MDE4/NzQ1NTcwX2YxMXgu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:42:07.778Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 637,
    "title": "Sleek Boxing Gloves",
    "slug": "sleek-boxing-gloves-98",
    "description": "High-quality sleek boxing gloves perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 36757,
    "images": [
      "https://imgs.search.brave.com/QPQn6GA-beL85my65nn17NHfS5amcsyQDvEXM-DjpJo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDcv/Mzg1LzQ1MS9zbWFs/bC9hLXBhaXItb2Yt/d2hpdGUtYm94aW5n/LWdsb3Zlcy1pc29s/YXRlZC1vbi1hLXdo/aXRlLWJhY2tncm91/bmQtaGlnaGxpZ2h0/aW5nLXRoZWlyLWNs/ZWFuLWFuZC1zbGVl/ay1kZXNpZ24tZnJl/ZS1waG90by5qcGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:33:46.586Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 682,
    "title": "Sleek Car Vacuum",
    "slug": "sleek-car-vacuum-143",
    "description": "High-quality sleek car vacuum perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 21803,
    "images": [
      "https://imgs.search.brave.com/Fu9wYSFmDu6-rMBRLrTs-BZQsi_i4imAj_w5WlU5zsI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kZW9k/YXAuaW4vY2RuL3No/b3AvZmlsZXMvM2lu/MVZhY3V1bWNsZWFu/ZXItMDZfYmZlMzc2/NDEtMGIyYS00ZjZl/LThhNWItNmFhYzI4/ZGQ5OGE3LmpwZz92/PTE3NjcwNzk0MTUm/d2lkdGg9MTk0Ng"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:57:09.262Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 557,
    "title": "Classic Jacket",
    "slug": "classic-jacket-18",
    "description": "High-quality classic jacket perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 35989,
    "images": [
      "https://imgs.search.brave.com/gTwy1xZg-Kn18BJ-dKC_sjdubjYDm5F7fQ2CKPAzCJ4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDMv/NzM3LzI3Ny9zbWFs/bC9ibGFjay1sZWF0/aGVyLWphY2tldC1p/c29sYXRlZC1vbi13/aGl0ZS1iYWNrZ3Jv/dW5kLWNsYXNzaWMt/bW9kZXJuLWxlYXRo/ZXItamFja2V0LWZy/ZWUtcGhvdG8uanBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:42:40.966Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 648,
    "title": "Modern Eyeliner",
    "slug": "modern-eyeliner-109",
    "description": "High-quality modern eyeliner perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 32072,
    "images": [
      "https://imgs.search.brave.com/0jlMAiTewVPwHQ_DfalYqBv2Ra7h5RyUFJmtu3zCPjc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q2L2Fi/LzliL2Q2YWI5YmNi/MzgwMzMwNTFmNWYy/OWYwMWQzMzVmOTdl/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:37:47.089Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 575,
    "title": "Pro Desk",
    "slug": "pro-desk-36",
    "description": "High-quality pro desk perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 7153,
    "images": [
      "https://imgs.search.brave.com/R4Nx4F_Se6HvUOfAk4L62lBqe72DumihGnnwwquyAu0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly95YWFz/YS5jb20vY2RuL3No/b3AvcHJvZHVjdHMv/eWFhc2EtZGVzay1w/cm8tMi0xMzl4NzUt/b2Zmd2hpdGVfbnI3/XzAxLTAwMDg1LTAy/XzU0ZmQzNDAyLThh/NWYtNGI0MS05N2E0/LTZiZDIzZDg3ZDVh/Yl84MDB4LmpwZz92/PTE3MzM5NDA4NzU"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:52:20.551Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 649,
    "title": "Essential Eyeshadow",
    "slug": "essential-eyeshadow-110",
    "description": "High-quality essential eyeshadow perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 39697,
    "images": [
      "https://imgs.search.brave.com/4xW9zugIGYA-qcTt1ABLhd_rhcZAcLuzmcZ1yorUPCU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZnluZC5jb20vdjIv/ZmFsbGluZy1zdXJm/LTdjOGJiOC9meXBy/b2Qvd3Jrci9wcm9k/dWN0cy9waWN0dXJl/cy9pdGVtL2ZyZWUv/b3JpZ2luYWwvMDAw/MDAwMDAwNDk0Nzg5/ODQ1L2ZnNy0xWjBf/Z3UxLTAwMDAwMDAw/MDQ5NDc4OTg0NV83/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:38:10.716Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 577,
    "title": "Sleek Cabinet",
    "slug": "sleek-cabinet-38",
    "description": "High-quality sleek cabinet perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 27144,
    "images": [
      "https://imgs.search.brave.com/ei__dlBjd0V9pvPpE1RLRcaVyiBYGOpf8cJj7fJ8GXk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pa2ly/dS5pbi9jZG4vc2hv/cC9maWxlcy9idXkt/Y2FiaW5ldHMtYW5k/LXNpZGVib2FyZC1j/cmF0ZXItbGFyZ2Ut/Y2FiaW5ldC1ieS1h/cnRpc2FuLW1hbm9y/LW9uLWlraXJ1LW9u/bGluZS1zdG9yZS0y/LnBuZz92PTE3Mzky/Mjg2NDgmd2lkdGg9/MjAwMA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:54:12.041Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 558,
    "title": "Modern Sweater",
    "slug": "modern-sweater-19",
    "description": "High-quality modern sweater perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 14570,
    "images": [
      "https://imgs.search.brave.com/78d3wFY2XJx07JyxCdzF82dhtFEgqCtDYDMWou-JhYw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/Lzc3MzU2MTQvYy8y/MjEzLzIyMTMvMC81/NzEvaWwvNjIzOTE3/LzcyNjExOTAzODIv/aWxfMzAweDMwMC43/MjYxMTkwMzgyX2Qw/Y2MuanBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:29:07.739Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 600,
    "title": "Premium Chronograph",
    "slug": "premium-chronograph-61",
    "description": "High-quality premium chronograph perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 41431,
    "images": [
      "https://imgs.search.brave.com/MtdbUR-YVw0Hdx-WvlMvPCPG4JXrRc_ZLnIWRDQ_ibc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4x/LmV0aG9zd2F0Y2hl/cy5jb20vbWVkaWEv/Y2F0YWxvZy9wcm9k/dWN0L2NhY2hlLzA2/YjAzMjVmZTBkMWVh/MDc0YzY3MDM1ZmU1/OTM1ODQ1L28vbS9v/bWVnYS1zcGVlZG1h/c3Rlci0zMTAtMjMt/NDItNTAtOTktMDAx/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:34:58.911Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 606,
    "title": "Ultra Automatic Watch",
    "slug": "ultra-automatic-watch-67",
    "description": "High-quality ultra automatic watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 21685,
    "images": [
      "https://imgs.search.brave.com/PfgnwsOM1uvKSiqLkvMWMCkQ18mB0XUyCMDYrASP-DA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tb25v/Y2hyb21lLXdhdGNo/ZXMuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzAzL0J1/bGdhcmktT2N0by1G/aW5pc3NpbW8tVG91/cmJpbGxvbi1BdXRv/bWF0aWMtV29ybGRz/LVRoaW5uZXN0LUF1/dG9tYXRpYy1XYXRj/aC1hbmQtVG91cmJp/bGxvbi1CYXNlbHdv/cmxkLTIwMTgtMi5q/cGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:07:04.807Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 639,
    "title": "Minimalist Helmet",
    "slug": "minimalist-helmet-100",
    "description": "High-quality minimalist helmet perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 31329,
    "images": [
      "https://imgs.search.brave.com/hVS8i9MEwfShN82imuIUPBskMhWE2Y6O5_6Og5yTBPs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dHJlbmRodW50ZXJz/dGF0aWMuY29tL3Ro/dW1icy8zODQvdGhv/dXNhbmQtc3RlYWx0/aC1iaWtlLWhlbG1l/dF8xMWVjNWI2NC5q/cGVn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:40:23.292Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 610,
    "title": "Compact Fitness Tracker",
    "slug": "compact-fitness-tracker-71",
    "description": "High-quality compact fitness tracker perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 28959,
    "images": [
      "https://imgs.search.brave.com/bNNEo8skkj5ZCckBkxOxHkXbnnESTmU5jRGNcK4c3WQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waXNj/ZXMuYmJ5c3RhdGlj/LmNvbS9pbWFnZTIv/QmVzdEJ1eV9VUy9p/bWFnZXMvcHJvZHVj/dHMvZjdiYzZjYjIt/ZDMzZi00MDZjLWJj/ZTQtZjcyNGQwMjc0/Y2QyLmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:13:09.739Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 658,
    "title": "Heavy-Duty Nail Polish",
    "slug": "heavy-duty-nail-polish-119",
    "description": "High-quality heavy-duty nail polish perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 33387,
    "images": [
      "https://imgs.search.brave.com/0wk0LP20OFL6z5a7vrPDUjQ6UBwp687lmI77NiflgSQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9uYWls/c3VwcGxpZXNtdW1i/YWkuaW4vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMDYvU2hp/bGxzLVByb2Zlc3Np/b25hbC1XaGl0ZS1H/ZWwtUG9saXNoLTE1/bWwtU0gwMzctMS53/ZWJw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:41:20.367Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 543,
    "title": "Modern Camera",
    "slug": "modern-camera-4",
    "description": "High-quality modern camera perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 1142,
    "images": [
      "https://imgs.search.brave.com/6qCZXAdF16RG-GXU0-XrsWwP7IbV8XXEiKjErSgDaXg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFVRDBEQ0lWU0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:35:19.046Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 50
  },
  {
    "id": 552,
    "title": "Elite Webcam",
    "slug": "elite-webcam-13",
    "description": "High-quality elite webcam perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 11569,
    "images": [
      "https://imgs.search.brave.com/uKVDBcDV26Kxj9SvGLD48E10Ou_xohd4XCxQpyN1KAA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS53aXJlZC5jb20v/cGhvdG9zLzY5ZmE1/YmU0MmE0M2IyOWQ2/YWNkNjgxZC80OjMv/d182NDAsY19saW1p/dC9pbnN0YTM2MC1s/aW5rMmMtcHJvLTAy/JTIwU09VUkNFJTIw/THVrZSUyMExhcnNl/bi5qcGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:27:59.878Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 50
  },
  {
    "id": 612,
    "title": "Elite Minimalist Watch",
    "slug": "elite-minimalist-watch-73",
    "description": "High-quality elite minimalist watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 2930,
    "images": [
      "https://imgs.search.brave.com/Zc4QyZj-ahU6In4xblpoyNLnQKmobBiUCDCBUAuzdp0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z2Vzc2F0by5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MTIvbWluaW1hbGlz/dC13YXRjaGVzLTUu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:14:34.048Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 540,
    "title": "Premium Smartphone",
    "slug": "premium-smartphone-1",
    "description": "High-quality premium smartphone perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 48024,
    "images": [
      "https://imgs.search.brave.com/n3d--2kcNgTJH8ENXOBgky-ML8KYthcT13TFdB4PPDQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIz/NTcxODEzNS9waG90/by9sb25kb24tdW5p/dGVkLWtpbmdkb20t/YXBwbGVzLW5ldy1p/cGhvbmUtMTctcHJv/LW1heC1vbi1kaXNw/bGF5LWR1cmluZy10/aGUtYXBwbGVzLW5l/dy1pcGhvbmUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUdZ/Zm5CU2lpNVBSaXR4/aDc2a3V2OGRyMDlj/Q1hRV2xBQlJwaU1y/aV9oWVE9"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:27:30.726Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 10
  },
  {
    "id": 549,
    "title": "Minimalist Microphone",
    "slug": "minimalist-microphone-10",
    "description": "High-quality minimalist microphone perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 49098,
    "images": [
      "https://imgs.search.brave.com/HrjorFrn8KK5IoIWcuS_JG2tb3MJJFuJeJz0VNy34Z8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFhYitkTDVMdUwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:31:55.968Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 49
  },
  {
    "id": 541,
    "title": "MACBOOK M5",
    "slug": "luxury-laptop-2",
    "description": "High-quality luxury laptop perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 47505,
    "images": [
      "https://imgs.search.brave.com/8SZ7x6B82CgIdSexYkWasOrmAUAGh6kCUNr2ZA5StQA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YXBwbGUuY29tL3Yv/bWFjYm9vay1uZW8v/Yi9pbWFnZXMvb3Zl/cnZpZXcvd2VsY29t/ZS9oZXJvX2VuZGZy/YW1lX19jNjJxNDgz/aW01c2lfeGxhcmdl/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:33:54.815Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 50
  },
  {
    "id": 542,
    "title": "Classic Headphones",
    "slug": "classic-headphones-3",
    "description": "High-quality classic headphones perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 34042,
    "images": [
      "https://imgs.search.brave.com/vOAWKswjYvMuA_CA6OxLu41nEmDMfKCeCqzgerukPXU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzYxMi82MTIveGlm/MHEvaGVhZHBob25l/L3UvMy9nL2ZvbGRh/YmxlLW11c2ljLWhl/YWRwaG9uZXMtd2l0/aC1idWlsdC1pbi1t/aWMtc2hyZWV2aXN0/YWFyLW9yaWdpbmFs/LWltYWhwamplenBi/NnF5OWcuanBlZz9x/PTcw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:34:55.693Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 50
  },
  {
    "id": 544,
    "title": "Essential Tablet",
    "slug": "essential-tablet-5",
    "description": "High-quality essential tablet perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 2721,
    "images": [
      "https://imgs.search.brave.com/PiM-nRFYKHi2JL1vzRE7wPpNYgtaXFYEtc4ZR3gs9Uo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzF0N3k3TGVQd0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:35:42.613Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 50
  },
  {
    "id": 545,
    "title": "Pro Monitor",
    "slug": "pro-monitor-6",
    "description": "High-quality pro monitor perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 38264,
    "images": [
      "https://imgs.search.brave.com/Q4dYBPkqRVR34SeQG7tq6YHnfLxecCzZa8v1zAHdDgs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFBalllMDJqakwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:36:24.607Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 50
  },
  {
    "id": 551,
    "title": "Vintage Mouse",
    "slug": "vintage-mouse-12",
    "description": "High-quality vintage mouse perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 50070,
    "images": [
      "https://imgs.search.brave.com/NzOniEXXXoPPlvJfv1lM33ALQi4kpG6U12XT-KzFBqE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjAv/MDk5LzI5My9zbWFs/bC9hLXNsZWVrLWJs/YWNrLWdhbWluZy1t/b3VzZS13aXRoLWN1/c3RvbWl6YWJsZS1y/Z2ItbGlnaHRzLWRl/c2lnbmVkLWZvci1w/cmVjaXNpb24tYW5k/LXBlcmZvcm1hbmNl/LXBob3RvLmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:37:02.908Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 50
  },
  {
    "id": 553,
    "title": "Heavy-Duty TV",
    "slug": "heavy-duty-tv-14",
    "description": "High-quality heavy-duty tv perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 19470,
    "images": [
      "https://imgs.search.brave.com/L2qzU0rRXlhlzxz_UuA1jwyUekYSx0-w7G19CqQUBPA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vODVJ/TkNILU5FT1FMRUQt/U0VSSUVTLTktOEst/NzY4MFg0MzIwXzlj/ZmE2ZjhhLTA5M2Ut/NGIwMy04MTRiLWNi/MWUxNTQ4MDE1OS42/YmU0NjRmYzM1OWYw/YzRhY2QwNWM5Njc4/MzI4YTFiYy5qcGVn/P29kbkhlaWdodD01/NzYmb2RuV2lkdGg9/NTc2Jm9kbkJnPUZG/RkZGRg"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:37:51.170Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 50
  },
  {
    "id": 554,
    "title": "Smart Projector",
    "slug": "smart-projector-15",
    "description": "High-quality smart projector perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 5816,
    "images": [
      "https://imgs.search.brave.com/ZLKPtdhFZtx2kJWxEAs5-LpKG07yy5VUAAzOkcUTOUU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wODEv/MjkyLzYzMy9zbWFs/bC9tb2Rlcm4tbXVs/dGltZWRpYS1wcm9q/ZWN0b3Itd2l0aC1i/cmlnaHQtYmx1ZS1s/aWdodC1pbi1kYXJr/LXJvb20tY2xvc2Ut/dXAtcGhvdG8uanBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:38:20.076Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 50
  },
  {
    "id": 547,
    "title": "Sleek Router",
    "slug": "sleek-router-8",
    "description": "High-quality sleek router perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 3130,
    "images": [
      "https://imgs.search.brave.com/1j6HpXZeCXlg9PQDFybjMiLXvW986lMZzapYd7RBmVA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU0/OTQ4MDcyL3Bob3Rv/L2Etd2lyZWxlc3Mt/cm91dGVyLXNob3dp/bmctc2lnbmFsLWJl/YW1zLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1KSVNhSVI4/ZHJsdDBFd203VGhM/c0M4WE9CcjRWczRH/TkF5S1RhUXdwVW1R/PQ"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:38:54.029Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 49
  },
  {
    "id": 550,
    "title": "Compact Keyboard",
    "slug": "compact-keyboard-11",
    "description": "High-quality compact keyboard perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 8430,
    "images": [
      "https://imgs.search.brave.com/-TLVVwXJJ9VgsJfSb960-X2YFY6Y6m26hJ9J1AB7xxY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9scy5j/b2RldGVjaC5ubC9z/aG9wcy8xNTM0MC9m/aWxlcy80MTIxMTI4/MDMvMjQ5eDI0OXgy/L2tpbmVzaXMtYWR2/YW50YWdlMzYwLXBy/by1jb21wYWN0LXNw/bGl0LWtleWJvYXJk/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:39:29.953Z",
    "deleted_at": null,
    "category_id": 295,
    "availableQuantity": 49
  },
  {
    "id": 555,
    "title": "Premium T-Shirt",
    "slug": "premium-t-shirt-16",
    "description": "High-quality premium t-shirt perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 25378,
    "images": [
      "https://imgs.search.brave.com/ufBCd4RN0COeq1nXATf56Rl7yvTpIzBtLLDok1NNC_s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibHVv/cm5nLmNvbS9jZG4v/c2hvcC9maWxlcy9y/M3dmM3J3ZmQzdy5q/cGc_dj0xNzgzODMz/OTM4JndpZHRoPTYw/MA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:28:40.246Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 562,
    "title": "Sleek Coat",
    "slug": "sleek-coat-23",
    "description": "High-quality sleek coat perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 47793,
    "images": [
      "https://imgs.search.brave.com/-WgKRbqL4p1JRDsLSOhOBwrWmw3tzvDm2g0OvjWFMqs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9idWZm/ZXJ5LnVzL2Nkbi9z/aG9wL3Byb2R1Y3Rz/L2J1ZmZlcnktc2xl/ZWstc3BvcnQtY29h/dC1zbGF0ZS0xMC5q/cGc_dj0xNjU2MDg3/NjcxJndpZHRoPTEw/ODA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:43:57.401Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 564,
    "title": "Minimalist Gloves",
    "slug": "minimalist-gloves-25",
    "description": "High-quality minimalist gloves perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 7458,
    "images": [
      "https://imgs.search.brave.com/bumYiWq9Ya9At2WIb1pS3VF1gfPkDxUVRN2GnbKuBSo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTcv/NDQzLzg3Mi9zbWFs/bC9leHRyYW9yZGlu/YXJ5LW1pbmltYWxp/c3QtbGVhdGhlci13/b3JrLWdsb3Zlcy13/aXRoLXN0aXRjaGlu/Zy1kZXRhaWwtaXNv/bGF0ZWQtcHJvZmVz/c2lvbmFsLXBuZy5w/bmc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:44:34.767Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 566,
    "title": "Vintage Beanie",
    "slug": "vintage-beanie-27",
    "description": "High-quality vintage beanie perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 35527,
    "images": [
      "https://imgs.search.brave.com/0nJOjVMG055i1KITk_x8DbkDa2ei_AxL0j9aMIpVTmg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL1lBSUFB/T1N3S3k1bWNhUnAv/cy1sNDAwLndlYnA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:45:20.128Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 568,
    "title": "Heavy-Duty Polo",
    "slug": "heavy-duty-polo-29",
    "description": "High-quality heavy-duty polo perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 45500,
    "images": [
      "https://imgs.search.brave.com/jYL2_mW4iihCa0meKpInbls1N--nypo-ktNgtZM3OXw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cmVnYWxvc3B1Ymxp/Y2l0YXJpb3MuY29t/LzEyMjUwMS1sYXJn/ZV9kZWZhdWx0L3Bv/bG8taGVhdnktZHV0/eS5qcGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:46:30.380Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 569,
    "title": "Smart Vest",
    "slug": "smart-vest-30",
    "description": "High-quality smart vest perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 14756,
    "images": [
      "https://imgs.search.brave.com/wEZSwC1amsjFD0uqx5mmitCY7NeO9j0dFM9raoY-fAg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFCcmdjcy1mYUwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:47:07.125Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 570,
    "title": "Premium Sofa",
    "slug": "premium-sofa-31",
    "description": "High-quality premium sofa perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 40608,
    "images": [
      "https://imgs.search.brave.com/7VF33-nuNe4fCzO4yxF2JZrB9BXtVHu7uJeq7c6MTdM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90b3Jx/dWVpbmRpYS5jby9j/ZG4vc2hvcC9maWxl/cy9DaGF0R1BUSW1h/Z2VKYW4yMV8yMDI2/XzA0XzA4XzA1UE0u/cG5nP2Nyb3A9Y2Vu/dGVyJmhlaWdodD0y/MDMmdj0xNzc1ODA4/OTc5JndpZHRoPTI3/MA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:48:24.493Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 571,
    "title": "Luxury Coffee Table",
    "slug": "luxury-coffee-table-32",
    "description": "High-quality luxury coffee table perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 19291,
    "images": [
      "https://imgs.search.brave.com/OvyaY7IzLK-ckNJVg3mp3EqT4QFTEV8DRhVU4EAEXXg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/OTF2QThhNjI3Q0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:49:23.737Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 572,
    "title": "Classic Chair",
    "slug": "classic-chair-33",
    "description": "High-quality classic chair perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 37139,
    "images": [
      "https://imgs.search.brave.com/8NfNz5C2XTi62xnaXg0jkANiVZlcmTqPKGWtESCwwos/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jZ3RyYWRlci5j/b20vdmFyaWFudHMv/SjVkQkRzakVEakZ1/WjkyNWlIRHZpRHlN/Lzc4YWRkOWMyZjAy/ZmJkNzNhNDNmZmIz/OTcwYmUzODY4M2M1/ZjE1ZWZmNmNhODQ5/ZGM3OGM2NDRmNGZm/OWNlMWIvY2xhc3Np/Yy1jaGFpci0zZC1t/b2RlbC1tYXgtb2Jq/LTNkcy1mYngud2Vi/cA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:50:07.972Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 573,
    "title": "Modern Bookshelf",
    "slug": "modern-bookshelf-34",
    "description": "High-quality modern bookshelf perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 41663,
    "images": [
      "https://imgs.search.brave.com/4_LyzlfQDXVvem5KkQtd7SDMnZRpTCdczinxf31VQS8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzF1TmxGRWQyN0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:50:41.516Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 574,
    "title": "Essential Bed",
    "slug": "essential-bed-35",
    "description": "High-quality essential bed perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 29660,
    "images": [
      "https://imgs.search.brave.com/5yzG7FhVK9dbkbLJknVcXqxRzut1rWeN4yGyqSykjYs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFwYkQtQmJZN0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:51:26.745Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 559,
    "title": "Essential Hoodie",
    "slug": "essential-hoodie-20",
    "description": "High-quality essential hoodie perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 7085,
    "images": [
      "https://imgs.search.brave.com/_N9fYzsU9s4Gs-8Rm3VciylGAp9ZmchboyvDzIj_Dbs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lc3Nl/bnRpYWxzaG9vZGll/Y29tLnVzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNS8x/MS9FU1NFTlRJQUxT/LU92ZXJzaXplLUJs/YWNrLUhvb2RpZS0x/LTQzMHg0MzAud2Vi/cA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:29:42.073Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 561,
    "title": "Ultra Shirt",
    "slug": "ultra-shirt-22",
    "description": "High-quality ultra shirt perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 31599,
    "images": [
      "https://imgs.search.brave.com/kZxGh2taVz9nNOAAXDohPP1Y0qyEH0kNhDEzessK-FY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGVm/b3JtYWxjbHViLmlu/L2Nkbi9zaG9wL2Zp/bGVzL0NBUkFNRUwt/MDQuanBnP3Y9MTc4/NDE5ODk1NSZ3aWR0/aD0xNDQw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:30:34.743Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 565,
    "title": "Compact Scarf",
    "slug": "compact-scarf-26",
    "description": "High-quality compact scarf perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 33106,
    "images": [
      "https://imgs.search.brave.com/5QAHk-6aJEzXuV9BVYaXu4plelOUQNldCm0GZV64Q0w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hY2Nl/c3Nvcml6ZWxvbmRv/bi5pbi9jZG4vc2hv/cC9maWxlcy9NQS0x/MDAwODgzODA5MV8x/X2I5YmE2NDI3LTJm/MTEtNDY3ZS05ZTU0/LTI2YjNmMDgwNGYy/OC5qcGc_dj0xNzY1/NDUzNTMxJndpZHRo/PTUwMA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:31:04.487Z",
    "deleted_at": null,
    "category_id": 296,
    "availableQuantity": 50
  },
  {
    "id": 576,
    "title": "Ultra Nightstand",
    "slug": "ultra-nightstand-37",
    "description": "High-quality ultra nightstand perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 45487,
    "images": [
      "https://imgs.search.brave.com/aCLKabqijxcf9GBBgRLOIcfe6Szrr6wCJkXi4IgOvHA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFKaVNlK1BpQUwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:53:07.373Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 580,
    "title": "Compact Dining Table",
    "slug": "compact-dining-table-41",
    "description": "High-quality compact dining table perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 8579,
    "images": [
      "https://imgs.search.brave.com/_poaQZKiXKZd0V75_N1ztR0btXTKgX1V5rLZmdz4cR0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjF1YzNwV3RlMEwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:56:00.918Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 579,
    "title": "Minimalist Bench",
    "slug": "minimalist-bench-40",
    "description": "High-quality minimalist bench perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 32494,
    "images": [
      "https://imgs.search.brave.com/sFjaY9vUoH-_svIQpXg3geMqlSx9K-44mh7A03GSV30/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMud2ZjZG4uY29t/L2ltLzgwNzA1NDc3/L3Jlc2l6ZS1oNDAw/LXc0MDBeY29tcHIt/cjg1LzMzMjIvMzMy/MjA4MzAxL01vZGVy/bitNaW5pbWFsaXN0/K09mZi13aGl0ZStC/ZW5jaC5qcGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:56:25.697Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 581,
    "title": "Vintage Recliner",
    "slug": "vintage-recliner-42",
    "description": "High-quality vintage recliner perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 18772,
    "images": [
      "https://imgs.search.brave.com/QgGxlVY2i7S21MthgOtUmm3w0vbw2kJYPGv4VbJB6sY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzczMDUzNjUvci9p/bC8yMmIxOWUvNzA2/NzI0MTgyMC9pbF8z/MDB4MzAwLjcwNjcy/NDE4MjBfc2xsOS5q/cGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:56:58.639Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 583,
    "title": "Heavy-Duty TV Stand",
    "slug": "heavy-duty-tv-stand-44",
    "description": "High-quality heavy-duty tv stand perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 38717,
    "images": [
      "https://imgs.search.brave.com/252oat5LKqht8LQss5uXMDsly0BVbSIfJlRn_woSwEg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ianMu/Y29tLmF1L2hpcmUv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzMvMjAxNi8wOC9O/Qi1BVkExODAwLTcw/LTFQX2Zyb250X2Jq/c193ZWIuanBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:57:26.267Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 584,
    "title": "Smart Dresser",
    "slug": "smart-dresser-45",
    "description": "High-quality smart dresser perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 19074,
    "images": [
      "https://imgs.search.brave.com/2YhAFwK8PazLOVEaGdUDvW9Hgtzor-rgm1spkGDcSuU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzVjLzky/LzUxLzVjOTI1MWI3/MDQ1NWFkNzZiNTYx/MzhlNTRhNjBkNmY1/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T05:58:05.649Z",
    "deleted_at": null,
    "category_id": 297,
    "availableQuantity": 50
  },
  {
    "id": 586,
    "title": "Luxury Boots",
    "slug": "luxury-boots-47",
    "description": "High-quality luxury boots perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 2429,
    "images": [
      "https://imgs.search.brave.com/NQp9uBhkxOmqt1WJoo1apzp9dTkCMUGyyW8c3TTo0HY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2MyLzcz/L2VlL2MyNzNlZTli/NTI1ZTJkNzg5Yzhl/YWRhODMzOGM1NjIx/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:31:46.396Z",
    "deleted_at": null,
    "category_id": 298,
    "availableQuantity": 50
  },
  {
    "id": 587,
    "title": "Classic Sandals",
    "slug": "classic-sandals-48",
    "description": "High-quality classic sandals perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 4556,
    "images": [
      "https://imgs.search.brave.com/nippS2PcK_HxotwN4sUI9bYanKXM6L-9sgB7HNJPA0Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zYWx0/d2F0ZXItc2FuZGFs/cy5jb20vY2RuL3No/b3AvcHJvZHVjdHMv/OTAwLWNvcmVfYWR1/bHQtd2hpdGUtMV82/N2MyZjYyZS1jMDUz/LTRhMDMtODJlYS0y/MGVlZmQyMzgxODMu/cG5nP3Y9MTc1NjQ1/OTg1NyZ3aWR0aD05/OTQ"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:32:09.147Z",
    "deleted_at": null,
    "category_id": 298,
    "availableQuantity": 50
  },
  {
    "id": 589,
    "title": "Essential Oxfords",
    "slug": "essential-oxfords-50",
    "description": "High-quality essential oxfords perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 37011,
    "images": [
      "https://imgs.search.brave.com/3DANR7CVrQfBeFtidMNiv031pEslhVme5hdOpZhNffk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzAx/NzUvODQ5Ni9maWxl/cy9iZWNrZXR0LXNp/bW9ub24tdHlwZXMt/b2Ytc2hvZXMtb3hm/b3Jkcy1wbGFpbi10/b2VfMTAyNHgxMDI0/LmpwZz92PTE1MzIw/MDc0MTA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:32:30.736Z",
    "deleted_at": null,
    "category_id": 298,
    "availableQuantity": 50
  },
  {
    "id": 590,
    "title": "Pro Slippers",
    "slug": "pro-slippers-51",
    "description": "High-quality pro slippers perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 25300,
    "images": [
      "https://imgs.search.brave.com/gHkDvVXLROr5ESdC6IQgtKoiz4kDiLGJB-7nSW8dGr8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFVNHlURVVhd0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:32:55.948Z",
    "deleted_at": null,
    "category_id": 298,
    "availableQuantity": 50
  },
  {
    "id": 591,
    "title": "Ultra Heels",
    "slug": "ultra-heels-52",
    "description": "High-quality ultra heels perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 28821,
    "images": [
      "https://imgs.search.brave.com/wP-R23Cag9ZbEgU9fIpxMTmqXV21eMDlzd8-4FaUD20/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL054NEFB/ZVN3TTRocUFLYXcv/cy1sNDAwLndlYnA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:33:25.480Z",
    "deleted_at": null,
    "category_id": 298,
    "availableQuantity": 50
  },
  {
    "id": 598,
    "title": "Heavy-Duty Ankle Boots",
    "slug": "heavy-duty-ankle-boots-59",
    "description": "High-quality heavy-duty ankle boots perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 9101,
    "images": [
      "https://imgs.search.brave.com/A7yslRu9VdFlC7Q89eolTXkt7J4wewYx7aIYzEy8SF4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTEuZmxpeGNh/cnQuY29tL2ltYWdl/LzgzMi84MzIveGlm/MHEvc2hvZS93L2kv/cS8xMC1iYWI5ODUt/MTAtc2hvZS1pc2xh/bmQtdGFuLW9yaWdp/bmFsLWltYWhkaHl5/dnhnaGVlM24uanBl/Zz9xPTcw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:03:25.633Z",
    "deleted_at": null,
    "category_id": 298,
    "availableQuantity": 50
  },
  {
    "id": 599,
    "title": "Smart Trainers",
    "slug": "smart-trainers-60",
    "description": "High-quality smart trainers perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 45097,
    "images": [
      "https://imgs.search.brave.com/Ho91Bj6p0QVdZE7s3qsfXLxfrVVr2UCO1iepfb513uQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kMm9i/MGl6dHNheHk1di5j/bG91ZGZyb250Lm5l/dC9wcm9kdWN0LzM0/NjMyNC8zNDYzMjQ3/MjUwX21haW4uanBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:04:03.359Z",
    "deleted_at": null,
    "category_id": 298,
    "availableQuantity": 50
  },
  {
    "id": 601,
    "title": "Luxury Smartwatch",
    "slug": "luxury-smartwatch-62",
    "description": "High-quality luxury smartwatch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 11798,
    "images": [
      "https://imgs.search.brave.com/swMiidJO4S1-tZ2XuVYtPwMpfY1m8qIr6nVwoyXZ_bM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2FuaXR5LmlvL2lt/YWdlcy9lMGdwMWwy/Zy9wcm9kdWN0aW9u/L2M5ZjEzOWE1ZWJl/NWI5YzhlNDllMDE1/YzI0NmJhMWZlOTBk/NDAwYmMtMjAwMHgx/MjAwLndlYnA_dz0x/OTIwJmg9MTA4MCZx/PTg0JmF1dG89Zm9y/bWF0JmZpdD1jcm9w"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:05:05.162Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 602,
    "title": "Classic Leather Watch",
    "slug": "classic-leather-watch-63",
    "description": "High-quality classic leather watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 14958,
    "images": [
      "https://imgs.search.brave.com/_J21W2pDpJvnqhSUNAYNPU5G1fQiYfLnXUMnXzU6VU8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFFb09QV1NOVUwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:05:35.803Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 604,
    "title": "Essential Analog Watch",
    "slug": "essential-analog-watch-65",
    "description": "High-quality essential analog watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 4812,
    "images": [
      "https://imgs.search.brave.com/T1VSa_I1Ovp10bEKaOi-sxWzcvQGr-3MON1vLw3XoDE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aW1l/eC5jb20vY2RuL3No/b3AvZmlsZXMvVFcy/WTkyMDAwX00uanBn/P3Y9MTc4NzIzNTky/NSZ3aWR0aD03Njg"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:06:27.678Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 605,
    "title": "Pro Diver Watch",
    "slug": "pro-diver-watch-66",
    "description": "High-quality pro diver watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 4589,
    "images": [
      "https://imgs.search.brave.com/qJvgg3ZXBCQLt87vmt4vv1ZjgGTJUm2YtlGuXibfVlY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGl0YW4uY28uaW4v/ZHcvaW1hZ2UvdjIv/QktERF9QUkQvb24v/ZGVtYW5kd2FyZS5z/dGF0aWMvLS9TaXRl/cy10aXRhbi1tYXN0/ZXItY2F0YWxvZy9k/ZWZhdWx0L2R3YTg1/MDQxMWUvaW1hZ2Vz/L1RpdGFuL0NhdGFs/b2cvMTAwNjdLTTAy/XzEucG5nP3N3PTM2/MCZzaD0zNjA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:07:28.539Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 607,
    "title": "Sleek Dress Watch",
    "slug": "sleek-dress-watch-68",
    "description": "High-quality sleek dress watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 15970,
    "images": [
      "https://imgs.search.brave.com/1HCkEANiNCCC7CnSzjFcUCD92MuSbgIrHHViDcU91-w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzU5MjU4MTk5L3Iv/aWwvNmU0ZmVmLzgx/ODM2NDU3MDMvaWxf/MzAweDMwMC44MTgz/NjQ1NzAzXzIzaWou/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:07:55.766Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 608,
    "title": "Durable Pilot Watch",
    "slug": "durable-pilot-watch-69",
    "description": "High-quality durable pilot watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 25957,
    "images": [
      "https://imgs.search.brave.com/AngYOYc1LG33u9lZVi3brOwtJP--JZeToIZpU6MeNAk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/cXVlc3Rpb24tbG9v/a2luZy1mb3ItYS1k/dXJhYmxlLWFuYWxv/Zy13YXRjaC1mb3It/YS1taWxpdGFyeS12/MC1yODZhNW1yeHdy/eWYxLmpwZWc_d2lk/dGg9MzAyNCZmb3Jt/YXQ9cGpwZyZhdXRv/PXdlYnAmcz04ZjQ2/N2U2OTRkMTZmODZk/ZmEyMTc2NzRhNTAy/YTBkZDAyYjRhMGJj"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:12:26.621Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 609,
    "title": "Minimalist Field Watch",
    "slug": "minimalist-field-watch-70",
    "description": "High-quality minimalist field watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 31125,
    "images": [
      "https://imgs.search.brave.com/P597bWQSWBPD_ds2RTfh5hL6IzQSCgypbMnw_RgVrhg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXZl/bndhdGNoZXMuY29t/L2Nkbi9zaG9wL2Zp/bGVzLzFfMzhjNjgy/MDgtZDcyYy00ZDQw/LThhZGItNDY2YTM2/ZTk3MzhlXzYwMHgu/anBnP3Y9MTczOTk3/MjQ1Mg"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:13:42.363Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 594,
    "title": "Minimalist Hiking Boots",
    "slug": "minimalist-hiking-boots-55",
    "description": "High-quality minimalist hiking boots perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 46736,
    "images": [
      "https://imgs.search.brave.com/n_qK5XceZ8oZ2xP6QjNVKDUDPc1rOAJdEaS2zAToEto/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vTWlu/aW1hbGlzdC1Vbmlz/ZXgtQmFyZWZvb3Qt/SGlraW5nLUJvb3Rz/LWZvci1XaW50ZXIt/U2xpcC1Pbi1XYXJt/LVdhdGVycHJvb2Yt/V2lkZS1Ub2UtQm94/LUFua2xlLUJvb3Rz/LUlkZWFsLWZvci1I/aWtpbmctV2Fsa2lu/Zy1PdXRkb29yLVVz/ZV9jMzU2OTg3Zi1m/NmZiLTQ3MjUtODQ3/YS1iYzU3NTY4NWVj/Y2YuODMzMzhhNWQ0/NDRiYWRlYjg3NTNk/ZjFkNzU2OGZkNWUu/anBlZz9vZG5IZWln/aHQ9NTczJm9kbldp/ZHRoPTU3MyZvZG5C/Zz1GRkZGRkY"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:33:48.387Z",
    "deleted_at": null,
    "category_id": 298,
    "availableQuantity": 50
  },
  {
    "id": 596,
    "title": "Vintage Slip-ons",
    "slug": "vintage-slip-ons-57",
    "description": "High-quality vintage slip-ons perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 30477,
    "images": [
      "https://imgs.search.brave.com/yKCY4ZCjGrgroaV4Kl4UnzLHDi7ceTS8uc2_81XbiiE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bXlzaG9wbGluZS5j/b20vaW1hZ2Uvc3Rv/cmUvMTczMDM0NjUz/MDc0Ny9WaW50YWdl/LUxlYXRoZXItU2xp/cC1vbi1GbGF0cy0x/MF8xNDQ1eC5qcGc_/dz0xMzAwJmg9MTk1/MCZxPTgw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:34:19.975Z",
    "deleted_at": null,
    "category_id": 298,
    "availableQuantity": 50
  },
  {
    "id": 603,
    "title": "Modern Digital Watch",
    "slug": "modern-digital-watch-64",
    "description": "High-quality modern digital watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 17076,
    "images": [
      "https://imgs.search.brave.com/OGTbz4_AQEdkcvcH292Ne-tmxOQUh0oCM7vNM5ambVs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c29uYXRhd2F0Y2hl/cy5pbi9kdy9pbWFn/ZS92Mi9CS0REX1BS/RC9vbi9kZW1hbmR3/YXJlLnN0YXRpYy8t/L1NpdGVzLXRpdGFu/LW1hc3Rlci1jYXRh/bG9nL2RlZmF1bHQv/ZHc4OWNiNzAzMi9p/bWFnZXMvU29uYXRh/L0NhdGFsb2cvNzcx/NjJQTTA1V18xLmpw/Zz9zdz0zNjAmc2g9/MzYw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:35:42.135Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 611,
    "title": "Vintage Skeleton Watch",
    "slug": "vintage-skeleton-watch-72",
    "description": "High-quality vintage skeleton watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 4200,
    "images": [
      "https://imgs.search.brave.com/ACKdkULWWeQ_STxdkjNtjtpiirPPJ3dwASfI_GJhrUQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly92aW50/YWdlcmFkYXIuY29t/L2Nkbi9zaG9wL3By/b2R1Y3RzL0lNR180/NjU1X2dyYW5kZS5q/cGc_dj0xNTk3NTA5/ODI0"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:36:12.965Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 613,
    "title": "Heavy-Duty Luxury Watch",
    "slug": "heavy-duty-luxury-watch-74",
    "description": "High-quality heavy-duty luxury watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 16751,
    "images": [
      "https://imgs.search.brave.com/BzunuhFllyB3MuY7asacPDGULhGJI7pEwIsOph67gHA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFMUklwN091Vkwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:15:12.642Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 614,
    "title": "Smart Sport Watch",
    "slug": "smart-sport-watch-75",
    "description": "High-quality smart sport watch perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 27095,
    "images": [
      "https://imgs.search.brave.com/O40_rUc3HnUO9hc8hKA0iuh7uzQza68aVQ83MWAiaPk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFsZm91aDl4T0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:17:06.791Z",
    "deleted_at": null,
    "category_id": 299,
    "availableQuantity": 50
  },
  {
    "id": 615,
    "title": "Premium Sunglasses",
    "slug": "premium-sunglasses-76",
    "description": "High-quality premium sunglasses perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 46798,
    "images": [
      "https://imgs.search.brave.com/vdx-jcjFT-apumXVza4XYyc3KF0hQz5bgry7juUs5Rw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jYXJs/dG9ubG9uZG9uLmNv/LmluL2Nkbi9zaG9w/L2ZpbGVzL0NMU00x/NDdfMi5qcGc_dj0x/NzU2OTcwMDUwJndp/ZHRoPTExMDA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:19:59.120Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 617,
    "title": "Classic Backpack",
    "slug": "classic-backpack-78",
    "description": "High-quality classic backpack perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 46989,
    "images": [
      "https://imgs.search.brave.com/VN0hWDv2B5ZFL2mz0RTpFyP00VM5TlQ9fOXiSITcGE0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYWhp/bGVhdGhlci5jb20v/Y2RuL3Nob3AvZmls/ZXMvcHJldmlld19p/bWFnZXMvYTcxNzIz/NGE3MjI4NDdhZDg0/YTZlZjQxNzk2NDE3/ODQudGh1bWJuYWls/LjAwMDAwMDAwMDBf/NjAweC5qcGc_dj0x/Nzg2MDAzNjYx"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:20:28.718Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 618,
    "title": "Modern Necklace",
    "slug": "modern-necklace-79",
    "description": "High-quality modern necklace perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 7544,
    "images": [
      "https://imgs.search.brave.com/yNWhAEWhGPOoMH1LgtFJxiUR5dTsvriaLMkOIr44QHA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hY2Nl/c3Nvcml6ZWxvbmRv/bi5pbi9jZG4vc2hv/cC9wcm9kdWN0cy9N/QS00ODI2OTI4MTAw/MV82LmpwZz92PTE2/NzU5NDI2MDkmd2lk/dGg9NTAw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:20:56.977Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 619,
    "title": "Essential Belt",
    "slug": "essential-belt-80",
    "description": "High-quality essential belt perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 34065,
    "images": [
      "https://imgs.search.brave.com/snQ6gJSReMXRTiwJDfyXpiUpe12IKxl7T1sqQiJkPsM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/a29yZWVzc2VudGlh/bHMuY29tL2Nkbi9z/aG9wL2ZpbGVzL0dh/cnJpc29uX0VQX0Jl/bHRfSGVyb19JbWFn/ZS5wbmc_aGVpZ2h0/PTMwMCZ2PTE3NzE0/NDI5Nzg"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:21:34.966Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 620,
    "title": "Pro Ring",
    "slug": "pro-ring-81",
    "description": "High-quality pro ring perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 41672,
    "images": [
      "https://imgs.search.brave.com/fF9j59n2v89UbEnPP-Of_FGOVHQ_QsU1QW1GuK5LXzc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dWx0cmFodW1hbi5j/b20vX25leHQvaW1h/Z2UvP3VybD0vUmlu/Z1Byby9yaW5nLWVu/Z2luZWVyaW5nLndl/YnAmdz0xMjAwJnE9/NzU"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:22:16.710Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 621,
    "title": "Ultra Bracelet",
    "slug": "ultra-bracelet-82",
    "description": "High-quality ultra bracelet perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 26004,
    "images": [
      "https://imgs.search.brave.com/IMei0fYcSR7G5y0Xco9emWctryi7ycX9yBiylciJ_ZI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDF6OE10Q1lsZUwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:24:30.416Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 623,
    "title": "Durable Tie",
    "slug": "durable-tie-84",
    "description": "High-quality durable tie perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 47256,
    "images": [
      "https://imgs.search.brave.com/10EpedTdEBPII5-NMagvuuA07qp-CG5v4jGAukGScBM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFKN0xTdVpic0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:25:24.913Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 625,
    "title": "Compact Cap",
    "slug": "compact-cap-86",
    "description": "High-quality compact cap perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 12239,
    "images": [
      "https://imgs.search.brave.com/eyb9jSep8ULIkkKMSujTAFDTms2XNPDIScQlLTgdsz0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z2luZXR0b3Nwb3J0/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8wMy9DQVAt/Q1JPU1MtQ09NUEFD/VC1DQVAtYmxhY2st/MDEuanBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:26:40.415Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 626,
    "title": "Vintage Briefcase",
    "slug": "vintage-briefcase-87",
    "description": "High-quality vintage briefcase perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 43368,
    "images": [
      "https://imgs.search.brave.com/VAliiSC04FAEoM983DS9jno8gUCY27waQjDEHoE-sv8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTMv/Njg4Lzk5MC9zbWFs/bC9lbGVnYW50LWxl/YXRoZXItYnJpZWZj/YXNlLW9uLW1hcmJs/ZS10YWJsZS1waG90/by5qcGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:27:20.961Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 627,
    "title": "Elite Duffel Bag",
    "slug": "elite-duffel-bag-88",
    "description": "High-quality elite duffel bag perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 36279,
    "images": [
      "https://imgs.search.brave.com/mV4JD07CFIFc3DG1HvdSNY3JAXNoltDuk0llwOXPrRc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mdW5k/eXRhY3RpY2FsLmNv/bS9jZG4vc2hvcC9m/aWxlcy9ITFNEODQt/QmxhY2stRWNvbW0x/LmpwZz92PTE3MDI5/MDgwOTgmd2lkdGg9/MTQ0NQ"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:27:55.561Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 629,
    "title": "Smart Keychain",
    "slug": "smart-keychain-90",
    "description": "High-quality smart keychain perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 40490,
    "images": [
      "https://imgs.search.brave.com/7VifruEYCObnanpRIO5BZ2EMTQ-i66TTu00nTFwYDOQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFSeGFwN1hYN0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:29:27.831Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 616,
    "title": "Luxury Wallet",
    "slug": "luxury-wallet-77",
    "description": "High-quality luxury wallet perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 38566,
    "images": [
      "https://imgs.search.brave.com/J5OJSPcUm-RxBCnS_o6JqRd3hwyRSg_IGWGvxhwIEXE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/d2hpY2gtbHV4dXJ5/LXdhbGxldC1pcy13/b3J0aC10aGUtbW9u/ZXktdjAtZXkwMXo4/dGxweG1lMS5qcGVn/P3dpZHRoPTMwMjQm/Zm9ybWF0PXBqcGcm/YXV0bz13ZWJwJnM9/ZWVkOGMzZGYwYjZl/NzRkNWVhM2YzMjBi/NjEwMTE1MDc5MDEw/NjJiYQ"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:37:27.497Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 622,
    "title": "Sleek Earrings",
    "slug": "sleek-earrings-83",
    "description": "High-quality sleek earrings perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 45558,
    "images": [
      "https://imgs.search.brave.com/pVf6eMfRrN1M0pAaSbyDVJtm3dGIQ8ZiUqUQAwEZ7gI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y2FyYXRsYW5lLmNv/bS9tZWRpYS9jYXRh/bG9nL3Byb2R1Y3Qv/Si9FL0pFMDg2OTMt/MVJQOTAwXzFfbGFy/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:37:52.189Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 628,
    "title": "Heavy-Duty Cufflinks",
    "slug": "heavy-duty-cufflinks-89",
    "description": "High-quality heavy-duty cufflinks perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 12736,
    "images": [
      "https://imgs.search.brave.com/deJlXZIHHEZHmNUG1wV7W9UQkuudQhV9R0zvSy87W-0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxNnRVMXo1cTJM/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:38:42.642Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 631,
    "title": "Luxury Basketball",
    "slug": "luxury-basketball-92",
    "description": "High-quality luxury basketball perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 29096,
    "images": [
      "https://imgs.search.brave.com/6PMhg1jwyvv69hLwebZL_Qd_eObqqRHt5BUqs5JcK4s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcHNk/L2Jhc2tldGJhbGwt/YmFsbC1zcG9ydHMt/cm91bmQtb3Jhbmdl/LWVxdWlwbWVudC1n/YW1lLWhvb3BzLWNv/bXBldGl0aW9uXzE0/MTg4MDctMjExLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:31:49.351Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 632,
    "title": "Classic Football",
    "slug": "classic-football-93",
    "description": "High-quality classic football perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 31613,
    "images": [
      "https://imgs.search.brave.com/uUu2aUdtLNIGs6ZwcGmdHibck7qj1q-_PDnJdW1zOv8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9m/L2ZlL1RyaW9uZGFf/KGNyb3BwZWQpLmpw/Zw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:32:15.268Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 633,
    "title": "Modern Yoga Mat",
    "slug": "modern-yoga-mat-94",
    "description": "High-quality modern yoga mat perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 43170,
    "images": [
      "https://imgs.search.brave.com/MAKSfszWFiUMakaLtBcjmktFWuiHUCLNCdpqLpmCBkk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9va29s/aXZpbmcuY29tL2Nk/bi9zaG9wL2ZpbGVz/L2NsYXktZGlhbW9u/ZC1tYXQtLXJvbGwt/c2lkZS13ZWIuanBn/P3Y9MTc3Mjg1NTEz/MiZ3aWR0aD02MDA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:32:55.916Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 634,
    "title": "Essential Dumbbells",
    "slug": "essential-dumbbells-95",
    "description": "High-quality essential dumbbells perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 40504,
    "images": [
      "https://imgs.search.brave.com/HBZ0DGn1NXmh0UlZaNrh-mmH29LqOKeS18EWd9fHEVg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9yZXBm/aXRuZXNzLmNvbS9j/ZG4vc2hvcC9maWxl/cy9IZXhEQi1TdHVk/aW8tdGh1bWJuYWls/LmpwZz92PTE2OTk1/NTg5Mjcmd2lkdGg9/NDQ4"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:33:17.626Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 635,
    "title": "Pro Jump Rope",
    "slug": "pro-jump-rope-96",
    "description": "High-quality pro jump rope perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 37711,
    "images": [
      "https://imgs.search.brave.com/qdhUCtjgN6AbO313HOV0OWVSU3bIVzzFuXJJIDu80ZA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bGlmdHRlY2hmaXRu/ZXNzLmNvbS9jZG4v/c2hvcC9maWxlcy9k/b3dubG9hZF84OTNh/YTJhOS1kNWIyLTRh/YmMtYmZkNy0wMzA4/YzViZmNiOTcuanBn/P3Y9MTc4MDUwOTI1/MyZ3aWR0aD0zMjA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:34:07.706Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 641,
    "title": "Vintage Baseball Glove",
    "slug": "vintage-baseball-glove-102",
    "description": "High-quality vintage baseball glove perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 45349,
    "images": [
      "https://imgs.search.brave.com/ueU0UevLvK6Bg0IhDjIQTnf03bo05Cj2hDYwS270Ntk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTYy/NTQzNjIxL3ZlY3Rv/ci9iYXNlYmFsbC1n/bG92ZS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9cDN6YWpE/WlRBdW9UdHlqRkJ3/Z2twMTZLSTlVSHB6/Unp4QkE5dUh2ZVBF/bz0"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:34:45.709Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 643,
    "title": "Heavy-Duty Skateboard",
    "slug": "heavy-duty-skateboard-104",
    "description": "High-quality heavy-duty skateboard perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 10285,
    "images": [
      "https://imgs.search.brave.com/T9XlxP4FZFvd4FKpBpEcl09lfP_S2zS15U1GbodlKBs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODExWWpTUjJxVkwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:35:18.266Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 644,
    "title": "Smart Treadmill",
    "slug": "smart-treadmill-105",
    "description": "High-quality smart treadmill perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 36020,
    "images": [
      "https://imgs.search.brave.com/4Ph1uNmHhTdLmhJK4Ejndf0OihoKmt7mNhTP5YABaso/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdW5u/eWhlYWx0aGZpdG5l/c3MuY29tL2Nkbi9z/aG9wL2ZpbGVzL3N1/bm55LWhlYWx0aC1m/aXRuZXNzLXRyZWFk/bWlsbHMtZm9sZGFi/bGUtYXV0by1pbmNs/aW5lLXRyZWFkbWls/bC0yMGluY2gtYnJ1/c2hsZXNzLW1vdG9y/LXNldmVuXzc1MHgu/anBnP3Y9MTc4MTI3/ODc4MQ"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:35:53.989Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 645,
    "title": "Premium Lipstick",
    "slug": "premium-lipstick-106",
    "description": "High-quality premium lipstick perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 8770,
    "images": [
      "https://imgs.search.brave.com/hC4UPpKrOrA64TVrPAiOBiAS5edtmcnCePOa-TGn8Ns/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubWVlc2hvLmNv/bS9pbWFnZXMvcHJv/ZHVjdHMvMzU2MjU1/OTEzL2RrNXY3XzUx/Mi53ZWJwP3dpZHRo/PTM2MA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:36:42.820Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 646,
    "title": "Luxury Foundation",
    "slug": "luxury-foundation-107",
    "description": "High-quality luxury foundation perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 34764,
    "images": [
      "https://imgs.search.brave.com/CD-78fc5iiG7-0a93v0RNecI1fDd4DHh2XbDUK_DmMk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjF4aWRhdjBaZEwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:37:01.089Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 647,
    "title": "Classic Mascara",
    "slug": "classic-mascara-108",
    "description": "High-quality classic mascara perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 22202,
    "images": [
      "https://imgs.search.brave.com/m3JpvoCzBQ6NZRDQVDja-GBxkOc7qZkN9DHLP01vaxI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9yYXZp/ZS5jb20vY2RuL3No/b3AvZmlsZXMvRWZm/b3J0bGVzcy1MYXNo/LUNsYXNzaWMtQ3Vy/dmUtTWFzY2FyYS1C/bGFjay5qcGc_dj0x/Nzc0MzAwMjM3Jndp/ZHRoPTEyMDA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:37:23.255Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 638,
    "title": "Durable Bicycle",
    "slug": "durable-bicycle-99",
    "description": "High-quality durable bicycle perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 9897,
    "images": [
      "https://imgs.search.brave.com/NekTb4ZGA9mu2mo0g_0zuTJUZA2rI52BoAqD2ZfLBiA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kMmY5/dXdncG1iZXIxMy5j/bG91ZGZyb250Lm5l/dC9wdWJsaWMvdXBs/b2Fkcy9tb2JpbGUv/ZGNkOTUxOWViMzM3/NTgxNzE3NzI2MzE4/NzI4MjIuanBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:39:57.116Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 642,
    "title": "Elite Surfboard",
    "slug": "elite-surfboard-103",
    "description": "High-quality elite surfboard perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 27105,
    "images": [
      "https://imgs.search.brave.com/0HGE3BU0CXMTx6OF6M0rNn64b0BkWP_LckgRNobFodY/rs:fit:500:0:1:0/g:ce/aHR0cDovL3d3dy5h/bmRlcnNvbnNwb3J0/c2xsYy5jb20vRWxp/dGU3cC5qcGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:40:49.719Z",
    "deleted_at": null,
    "category_id": 301,
    "availableQuantity": 50
  },
  {
    "id": 650,
    "title": "Pro Blush",
    "slug": "pro-blush-111",
    "description": "High-quality pro blush perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 37931,
    "images": [
      "https://imgs.search.brave.com/zjXl65obL6409_A5Ft70gGp1ukVvdIfkAMLB4sPp1vU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jaGFy/YWN0ZXJjb3NtZXRp/Y3MuaW4vY2RuL3No/b3AvZmlsZXMvQy1B/MzAxLTEucG5nP3Y9/MTcyMzIwMzIzMyZ3/aWR0aD0yNDA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:38:51.630Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 651,
    "title": "Ultra Highlighter",
    "slug": "ultra-highlighter-112",
    "description": "High-quality ultra highlighter perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 48732,
    "images": [
      "https://imgs.search.brave.com/IG6NBqxP0rFvumFz1asiRv8eFrUR4dOSL0APmi5e1qI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oaWxh/cnlyaG9kYS5pbi9j/ZG4vc2hvcC9maWxl/cy8zX2FkMTEzMDI4/LWY2Y2MtNDMzZC1i/ZWRjLTlmMzM2MDQy/YjYyMC5qcGc_dj0x/NzU1NDU2NDgzJndp/ZHRoPTgwMA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:39:21.217Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 652,
    "title": "Sleek Perfume",
    "slug": "sleek-perfume-113",
    "description": "High-quality sleek perfume perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 35576,
    "images": [
      "https://imgs.search.brave.com/saLeAue3k6fwUQbA1ECJDAfp_yeSjZJLJYCq5tVnBvw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5wYXJmdW1vLmNv/bS9wZXJmdW1lcy9l/MS9lMWM4MDgtc2xl/ZWstdmVsdmV0LWZp/bGktZGktcHJvZnVt/b18xMjAwLmpwZz93/aWR0aD03MjAmYXNw/ZWN0X3JhdGlvPTE6/MQ"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:40:00.442Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 653,
    "title": "Durable Cologne",
    "slug": "durable-cologne-114",
    "description": "High-quality durable cologne perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 5903,
    "images": [
      "https://imgs.search.brave.com/Ff4CEeiT2jml7lvzYWrM6Qr4ifcsTc4q1Mp-0hEuR48/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxWXJQSFloRnpM/LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:40:31.615Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 657,
    "title": "Elite Face Mask",
    "slug": "elite-face-mask-118",
    "description": "High-quality elite face mask perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 34367,
    "images": [
      "https://imgs.search.brave.com/eDOzoSYl8u1-krK0LgKI4jl0AInSEyFWJOx5QCMsO9w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9vcm9z/a2luLmNvL2Nkbi9z/aG9wL2ZpbGVzL1do/YXRzQXBwX0ltYWdl/XzIwMjUtMDgtMjlf/YXRfMTIuMTQuMTZf/MS5qcGc_dj0xNzU2/NDU5MzQ4JndpZHRo/PTg1Mw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:41:27.483Z",
    "deleted_at": null,
    "category_id": 302,
    "availableQuantity": 50
  },
  {
    "id": 660,
    "title": "Premium Action Figure",
    "slug": "premium-action-figure-121",
    "description": "High-quality premium action figure perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 17784,
    "images": [
      "https://imgs.search.brave.com/ARJbY_UU2-krqXhuF4siImRalfxiX9U7uF7DvxUX-lM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzYxMi82MTIveGlm/MHEvYWN0aW9uLWZp/Z3VyZS9hL3gvci8z/LXByZW1pdW0tc2Fu/amktc3R5bGlzaC1h/Y3Rpb24tZmlndXJl/LTEyY20tMTFjbS1h/cGotZW50ZXJwcmlz/ZXMtb3JpZ2luYWwt/aW1haHp5a3ZrdGV1/ZHpjay5qcGVnP3E9/NzA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:42:33.888Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 662,
    "title": "Classic Board Game",
    "slug": "classic-board-game-123",
    "description": "High-quality classic board game perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 35962,
    "images": [
      "https://imgs.search.brave.com/QkHxuNwNhO-1wMfMeQT9LEIsioxrRQ4PW8BiSX06NMw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFPdEx2VjJ1V0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:42:55.391Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 661,
    "title": "Luxury Lego",
    "slug": "luxury-lego-122",
    "description": "High-quality luxury lego perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 37879,
    "images": [
      "https://imgs.search.brave.com/CvDNvYJENJynx1FoDeO80CuJZbvlDMTAGH7dueVieZk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzE5dFRtQzE1M0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:44:07.852Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 663,
    "title": "Modern Puzzle",
    "slug": "modern-puzzle-124",
    "description": "High-quality modern puzzle perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 8112,
    "images": [
      "https://imgs.search.brave.com/ZCrnVI8sjAytZBQ50B3EyIFCSPEnrMh9cjZm-3XrEtQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFrZmJuZktYTEwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:44:36.806Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 664,
    "title": "Essential Doll",
    "slug": "essential-doll-125",
    "description": "High-quality essential doll perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 20292,
    "images": [
      "https://imgs.search.brave.com/Gnw5UTx1d8sO7tClX884w-KZqi8umRLAo0ohiFtCnBw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ltYWdl/LzYxMi82MTIveGlm/MHEvc3R1ZmZlZC10/b3kvMi90L2wvc29m/dC1wbHVzaC1kb2xs/LXdpdGgtMi1zaGFk/ZS1ncmVlbi1kcmVz/cy1oYXQtY3V0ZS1k/b2xsLWtpZHMtYW5k/LW9yaWdpbmFsLWlt/YWhnamFxanl2Y2dy/ZWEuanBlZz9xPTcw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:45:05.704Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 665,
    "title": "Pro RC Car",
    "slug": "pro-rc-car-126",
    "description": "High-quality pro rc car perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 22495,
    "images": [
      "https://imgs.search.brave.com/mi2Xls1SkFeI4_djpV1WvkrC1wj72u5kecpXfLLtHbo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jcmF6/eXJjLmNvbS9jZG4v/c2hvcC9maWxlcy8x/MjYuanBnP3Y9MTc4/MTc2Mzc4MyZ3aWR0/aD0zODQw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:45:53.377Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 666,
    "title": "Ultra Stuffed Animal",
    "slug": "ultra-stuffed-animal-127",
    "description": "High-quality ultra stuffed animal perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 5132,
    "images": [
      "https://imgs.search.brave.com/NegMuogDr8cacmI9krsCnpNMOqYeDIKkBdT1FLdgp6I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dWx0cmFzb2Z0dG95/cy5jb20vaW1hZ2Vz/L3Byb2R1Y3RfaW1h/Z2VzL2xhcmdlLzE2/NDVVU1QxLmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:46:38.987Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 668,
    "title": "Durable Train Set",
    "slug": "durable-train-set-129",
    "description": "High-quality durable train set perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 22713,
    "images": [
      "https://imgs.search.brave.com/Av9puLpBU4o_cDLlP2Hi4Kd_DIQ_apa5xIQjbdJ73yY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFoRDhKK1BHS0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:47:48.902Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 673,
    "title": "Heavy-Duty Robot",
    "slug": "heavy-duty-robot-134",
    "description": "High-quality heavy-duty robot perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 32629,
    "images": [
      "https://imgs.search.brave.com/4ExG26oBb2KORuBwARzzewkDzITuCcZrS2kafO1dc_M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90d28t/d2hpdGUtcm9ib3Rz/LWJhY2tncm91bmQt/dG95LWhhbmRzLXVw/LWlzb2xhdGVkLW9i/amVjdHMtMTgwMzIy/MTU0LmpwZw"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:49:13.963Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 675,
    "title": "Premium Dash Cam",
    "slug": "premium-dash-cam-136",
    "description": "High-quality premium dash cam perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 5658,
    "images": [
      "https://imgs.search.brave.com/cvEQKTLIaiK4TeGO7lhVrWEvaWgCNCkbWQJf-KxzCJA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kYXNo/Y2FtZXJhcy5pbi9j/ZG4vc2hvcC9wcm9k/dWN0cy9INGU1MDg3/MWNmNmFlNGY3M2Fk/NTUxMzFkYWRmYWYz/YWVmXzcwMHg3MDAu/anBnP3Y9MTY1NTg3/NDk2NQ"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:53:38.701Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 676,
    "title": "Luxury Car Charger",
    "slug": "luxury-car-charger-137",
    "description": "High-quality luxury car charger perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 2501,
    "images": [
      "https://imgs.search.brave.com/XIlEHDrcSBCHiTftxMdbQtgGonJ3nfztBYkrCb_X5q4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zLmFs/aWNkbi5jb20vQHNj/MDQva2YvSDBjOWMy/ODAxOGFjYzRhNWNi/ZGRlMDRkMjMxMjQy/ODg1Mi5qcGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:54:06.184Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 677,
    "title": "Classic Seat Cover",
    "slug": "classic-seat-cover-138",
    "description": "High-quality classic seat cover perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 24958,
    "images": [
      "https://imgs.search.brave.com/32qrFGTYUXyZBzunaprOibz7B51YaB6Xip_Av5fbDY8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFNU2I4SnZLMEwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:55:00.892Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 678,
    "title": "Modern Floor Mats",
    "slug": "modern-floor-mats-139",
    "description": "High-quality modern floor mats perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 8000,
    "images": [
      "https://imgs.search.brave.com/hHVItJNtm8U6QAREYrftpvu-r_LVQ0aW8_IjIUiYKOE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzE0Unl1SEowUUwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:55:36.669Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 679,
    "title": "Essential Jump Starter",
    "slug": "essential-jump-starter-140",
    "description": "High-quality essential jump starter perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 13101,
    "images": [
      "https://imgs.search.brave.com/f5qUPQMP0hJkvO-7KR3odQW29abjLy_9A79-dO_y7gU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90eXBl/c2F1dG8uY29tL2Nk/bi9zaG9wL2ZpbGVz/L1RZUEVTX1BEUDIw/MjZfQUM1MzI4MDYt/MV9yMS1JbWc2Xzhl/YTUzMTZkLThlMzYt/NDM0YS1iOTA3LWVl/NDU5ODc5MTVkNy5w/bmc_dj0xNzc2NzU0/NTkyJndpZHRoPTI1/MDA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:55:59.670Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 680,
    "title": "Pro Tire Inflator",
    "slug": "pro-tire-inflator-141",
    "description": "High-quality pro tire inflator perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 36311,
    "images": [
      "https://imgs.search.brave.com/1k1C2dpmdR00CbcbqE9_3LhyCg-Zk7Y6HFbNOZXUhS4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODE3MGthMHRKcUwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:56:21.156Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 681,
    "title": "Ultra Phone Mount",
    "slug": "ultra-phone-mount-142",
    "description": "High-quality ultra phone mount perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 17027,
    "images": [
      "https://imgs.search.brave.com/ij1jrGMvY58GaB8rVTcSqEJnxv4myZqgKa-0RJxUG9M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hcmtv/bi5jb20vY2RuL3No/b3AvZmlsZXMvc2xp/bS1ncmlwci11bHRy/YS1tdWx0aS1hbmds/ZS1hZGhlc2l2ZS1w/aG9uZS1jYXItbW91/bnQtZm9yLWlwaG9u/ZS1nYWxheHktYW5k/LW1vcmUtMi1hcmtv/bi1tb3VudHMtc202/MjguanBnP3Y9MTcx/NTI5NTgwNCZ3aWR0/aD04MDA"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:56:48.270Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 683,
    "title": "Durable Wipers",
    "slug": "durable-wipers-144",
    "description": "High-quality durable wipers perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 17080,
    "images": [
      "https://imgs.search.brave.com/aDZ-n_ijagD0TqjXHKqmdp9eq25quGWk_meRmKDnhKI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFDQWdZSCtQV0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:57:34.403Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 685,
    "title": "Compact Wheel Cover",
    "slug": "compact-wheel-cover-146",
    "description": "High-quality compact wheel cover perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 46854,
    "images": [
      "https://imgs.search.brave.com/IIAUABmFSdnHLJmMwktScLtG5Xj475DDOKDQjJhq9Xg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFrby1sTE9Xc0wu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:58:31.379Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  },
  {
    "id": 624,
    "title": "Minimalist Hat",
    "slug": "minimalist-hat-85",
    "description": "High-quality minimalist hat perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 43918,
    "images": [
      "https://imgs.search.brave.com/JC7RAKE1UxT9IT2lRhk8EtgJEEJEwPbTkJTCi8dwTE4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9paDEu/cmVkYnViYmxlLm5l/dC9pbWFnZS41MzY1/NjA5NTIyLjc1MTIv/c3NyY28sYnVja2V0/X2hhdCxwcm9kdWN0/LGZmZmRmNTo1MjU3/NTU5Nzc1LHNycCxz/cXVhcmUsNjAweDYw/MC1iZyxmOGY4Zjgu/dTEuanBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T06:26:01.133Z",
    "deleted_at": null,
    "category_id": 300,
    "availableQuantity": 50
  },
  {
    "id": 667,
    "title": "Sleek Blocks",
    "slug": "sleek-blocks-128",
    "description": "High-quality sleek blocks perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 47420,
    "images": [
      "https://imgs.search.brave.com/SaU1isbjb0xfMA1Vwa8pStIcgfcnzZLUkZuffgqvkAI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzYv/MzI2LzI0MS9zbWFs/bC9jb2xvcmZ1bC1p/bnRlcmxvY2tpbmct/YnVpbGRpbmctYmxv/Y2tzLWFycmFuZ2Vk/LWluLWEtc3ltbWV0/cmljYWwtY2FzdGxl/LWxpa2Utc3RydWN0/dXJlLW9uLWEtd2hp/dGUtYmFja2dyb3Vu/ZC1waG90by5qcGc"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:47:03.231Z",
    "deleted_at": null,
    "category_id": 303,
    "availableQuantity": 50
  },
  {
    "id": 688,
    "title": "Heavy-Duty Car Cover",
    "slug": "heavy-duty-car-cover-149",
    "description": "High-quality heavy-duty car cover perfect for everyday use. Designed with premium materials and excellent craftsmanship.",
    "price": 17546,
    "images": [
      "https://imgs.search.brave.com/eL2Z5cbxuFGa70z8f-oBi-ftH8_CPX0NWQ5HjM-lJsA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFXSktkMVlvbUwu/anBn"
    ],
    "creation_at": "2026-08-17T05:30:00.443Z",
    "updated_at": "2026-08-26T10:59:07.104Z",
    "deleted_at": null,
    "category_id": 304,
    "availableQuantity": 50
  }
];

export class SeedProductData1787813630406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const cat of SEED_CATEGORIES) {
            await queryRunner.query(
                `INSERT INTO category (id, name, image, creation_at, updated_at) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING`,
                [cat.id, cat.name, cat.image, cat.creation_at, cat.updated_at]
            );
        }

        for (const prod of SEED_PRODUCTS) {
            await queryRunner.query(
                `INSERT INTO product (id, title, slug, description, price, images, "availableQuantity", category_id, creation_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (id) DO NOTHING`,
                [prod.id, prod.title, prod.slug, prod.description, prod.price, `{${(prod.images || []).map((img: string) => `"${img}"`).join(',')}}`, prod.availableQuantity, prod.category_id, prod.creation_at, prod.updated_at]
            );
        }

        try {
            await queryRunner.query(`SELECT setval('category_id_seq', (SELECT MAX(id) FROM category))`);
            await queryRunner.query(`SELECT setval('product_id_seq', (SELECT MAX(id) FROM product))`);
        } catch (e: any) {
            console.log("Warning: sequences might not exist", e.message);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM product`);
        await queryRunner.query(`DELETE FROM category`);
    }

}
