# sebastiaantenpas.nl

The personal website on [sebastiaantenpas.nl](https://sebastiaantenpas.nl) and
[sebastiaantenpas.com](https://sebastiaantenpas.com): React, TypeScript and Vite.

Cloudflare Pages builds every push (`npm run build` into `dist`): `master` is
production, any other branch gets a preview URL. The Pages project and the
domains are managed in Tirzono/infrastructure (`cloudflare-sebastiaantenpas.tf`).

```sh
npm install
npm run dev
```
