//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-DjJUmQRF.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/hub",
			"/studio/$projectId"
		],
		preloads: [
			"/assets/index-BdEMJQMi.js",
			"/assets/rolldown-runtime-CbXtAM7H.js",
			"/assets/gemini-key-S_giAyak.js",
			"/assets/store-jLl54AHF.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BdEMJQMi.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DLKvK6Kn.js", "/assets/hud-chrome-BrNBOvVt.js"]
	},
	"/hub": {
		filePath: "/workspace/src/routes/hub.tsx",
		children: void 0,
		preloads: [
			"/assets/hub-ClTQcCZP.js",
			"/assets/use-capture-CuBvT_E1.js",
			"/assets/hud-chrome-BrNBOvVt.js"
		]
	},
	"/studio/$projectId": {
		filePath: "/workspace/src/routes/studio.$projectId.tsx",
		children: void 0,
		preloads: [
			"/assets/studio._projectId-ChcliLEU.js",
			"/assets/use-capture-CuBvT_E1.js",
			"/assets/hud-chrome-BrNBOvVt.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
