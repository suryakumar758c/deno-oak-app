import { Router } from "https://deno.land/x/oak/mod.ts";

import { upload } from "https://deno.land/x/oak_upload_middleware/mod.ts";

import { Auth, Feed, Files } from "./controller/index.ts";

import authorize from "./middlewares/authorize.middleware.ts";

import websocketListener from "./websocket/socket.ts";

const router: Router = new Router({
  prefix: "/api",
});

// router.get('/ws',websocketListener)
router.post("/login", Auth.login);
router.post("/register", Auth.register);

router.use(authorize);

// feed section
router.get("/feed", Feed.getFeed);

//file upload
router.post(
  "/upload-file",
  upload("uploads", {
    extensions: ["jpg", "png"],
    maxSizeBytes: 20000000,
    maxFileSizeBytes: 10000000,
  }),
  Files.uploaded
);

export default router;
