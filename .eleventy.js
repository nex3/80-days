module.exports = function (config) {
    config.setUseGitIgnore(false);

    config.addPassthroughCopy({ "source/images/*": "/images" });
    config.addPassthroughCopy({ "source/CNAME": "/CNAME" });
    config.addPassthroughCopy({ "node_modules/cesium/Build/Cesium": "/Cesium" });
    config.addPassthroughCopy({ "node_modules/openmoji/color/svg": "/images/openmoji" });

    return {
        templateFormats: ["md", "html", "js", "css"],
        dir: {
            input: "source",
        },
    };
};
