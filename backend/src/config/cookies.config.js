const defaultCookieOptions = {
    httpOnly: true,
    secure: true,                
    sameSite: "none",            
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export class Cookie {
    static set(res, key, value, options = {}) {
        const finalOptions = { ...defaultCookieOptions, ...options };
        res.cookie(key, value, finalOptions);
    }

    static clear(res, key = "token", options = {}) {
        const finalOptions = { ...defaultCookieOptions, ...options, maxAge: 0 };
        res.cookie(key, "", finalOptions);
    }

    static get(req, key = "token") {
        return req.cookies?.[key] || null;
    }
}
