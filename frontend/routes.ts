export const publicRoutes = [
    "/",
    "/unauthorized",
  ];
  
  export const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  
  export const adminRoutes = [
    "/admin",
    "/admin/dashboard",
    "/admin/users",
    "/admin/products",
    "/admin/products/create",
    "/admin/products/delete",
    "/admin/products/edit:id",
  ];
  
  export const userRoutes = [
    "/products",
    "/products/:id",
  ];
  
  export const apiAuthPrefix = "/api/auth";
  
  export const DEFAULT_LOGIN_REDIRECT = "/admin/dashboard";