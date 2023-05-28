import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  if (req) {
    let token = req.cookies.token;

    if (!token) {
      return next({ err: "No authorization is set", status: 401 });
    }
    try {
      token = token.trim() + "buzzzzz";
      const data = jwt.verify(token, process.env.SECRET);
      if (data && data._id) {
        req.user = data;
        next();
      } else {
        return next({ err: "Token is incorrect", status: 401 });
      }
    } catch (e) {
      return next({ err: "Token has expired", status: 401 });
    }
  }
};

export default auth;
