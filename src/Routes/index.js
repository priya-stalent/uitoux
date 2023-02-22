const express = require('express');
const router = express.Router();
const userRoute = require('./user.route');

const defaultRoutes = [
    {
      path: '/users',
      route: userRoute,
    },
    // {
    //   path: '/products',
    //   route: patientRoute,
    // },
  ];
  
//   const devRoutes = [
//     // routes available only in development mode
//     {
//       path: '/docs',
//       route: docsRoute,
//     },
//   ];
  
  defaultRoutes.forEach((route) => {
    console.log(route)
    router.use(route.path, route.route);
  });
  
module.exports = router;
  