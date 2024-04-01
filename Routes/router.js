// path to resolve each client request
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const  multerConfig  = require('../Middlewares/multerMiddleware')

//1) import express
const express = require("express");

//2) create an object for the class Router in express
const router = new express.Router()

//3)define paths
//syntax
// router.http -0request-method("path to resolve",()=>{
//     how to resolve the request (controller function)
// })

//1)user registration
router.post("/user/register", userController.register)


//2)user login
router.post('/user/login', userController.login)


//3)add new project
router.post('/project/add', jwtMiddleware,multerConfig.single('projectImage'),projectController.addproject)


//4) get project for home page
router.get('/project/home-projects', projectController.getHomeProject)


//5)get all projects
router.get('/project/all-project', jwtMiddleware, projectController.getAllproject)


//6)get user project
router.get('/project/user-ptoject', jwtMiddleware, projectController.getuserproject)


//7)edit user project
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editUserProject)

//8)delete user project
router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)



//4)export router
module.exports = router;