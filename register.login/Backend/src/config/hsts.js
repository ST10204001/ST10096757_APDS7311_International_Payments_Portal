const setupHSTS = (app) => {
    app.use((req, res, next) => {
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains"); // HSTS
        next();
    });
};

export default setupHSTS;
