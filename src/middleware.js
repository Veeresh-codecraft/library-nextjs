import NextAuth from "next-auth";
import authConfig from "./../auth.config";
import { getToken } from "next-auth/jwt";
import { Roles } from "./lib/user-management/models/user.model";
export const getRole = (role) => {
  switch (role) {
    case Roles.Admin:
      return "Admin";
    case Roles.Professor:
      return "Professor";
    case Roles.User:
      return "User";
    default:
      return "Unknown Role";
  }
};

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  else if (req.auth && req.nextUrl.pathname.startsWith("/dashboard/admin/")) {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    const roleId = token?.role;
    // console.log("User role is ", roleId);
    if (roleId) {
    }
    const userRole = getRole(roleId);
    // console.log("User role is ", userRole , roleId.toString());
    if (userRole !== "Admin") {
      const newUrl = new URL("/dashboard", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  } else if (
    req.auth &&
    req.nextUrl.pathname.startsWith("/dashboard/professor/")
  ) {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    const roleId = token?.role;
    // console.log("User role is ", roleId);
    if (roleId) {
    }
    const userRole = getRole(roleId);
    // console.log("User role is ", userRole , roleId.toString());
    if (userRole !== "Professor") {
      const newUrl = new URL("/dashboard", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});

export const config = {
  matcher: ["/dashboard/:path*" ],
};
