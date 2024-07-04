const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const getCategories = await Category.findAll({
      include: [
        {
          model: Product, as: "products",
          include: [
            {
              model: Tag, as: 'tags', through: { attributes: [] }
            }
          ]
        }
      ]
    });
    res.status(200).json(getCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product, as: 'products',
          include: [
            { model: Tag, as: 'tags', through: { attributes: [] } }
          ]
        }
      ]
    }); 

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err)
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
