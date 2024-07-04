const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findAll } = require('../../models/Category');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getTags = await Tag.findAll({
      include: [
        {
          model: Product, as: 'products',
          include: [
            {
              model: Tag, as: 'tags', through: {
                attributes: []
              }
            }
          ]
        }
      ]
    });

    res.status(200).json(getTags);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
