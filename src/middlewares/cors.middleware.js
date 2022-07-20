const whitelist = ["http://localhost:3000", "http://localhost:9000"];
export const corsOptions = {
  origin: function (origin, callback) {
    try {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    } catch (error) {
      callback(error);
    }
  },
};
