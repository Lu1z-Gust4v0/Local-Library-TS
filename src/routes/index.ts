import { Router } from "express"


const router: Router = Router()

router.get('/', (req, res) => {
  res.redirect("/catalog")
});

export { router as indexRoutes }
