import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.cookies['auth'];  
    
    if (!token) {
        return next();
    };

    try {
        const secret = process.env.AUTH_SECRET;
        const decodedToken = jwt.verify(token, secret);
        
        req.user = decodedToken;
        res.locals.user = decodedToken;       
       
    } catch (err) {
        res.clearCookie('auth');
        
    };
      next();
};

export function isAuth(req, res, next) {
    const token = req.cookies['auth'];  
    if(!token) {
       return res.redirect('/auth/login')
    };

    next();
};
 

export function isGuest(req, res, next) {
    const token = req.cookies['auth'];  
    
    if(token) {
      return res.redirect('/');
    };

    next();
};
