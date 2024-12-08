const express = require('express');
const DeliveryPartner = require('../models/DeliveryPartner');
const router = express.Router();

router.get('/', async (req, res) => {
  const partners = await DeliveryPartner.find();
  res.json(partners);
});

router.post('/', async (req, res) => {
  const partner = new DeliveryPartner(req.body);
  await partner.save();
  res.status(201).json(partner);
});

router.put('/:id', async (req, res) => {
  const partner = await DeliveryPartner.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(partner);
});

router.delete('/:id', async (req, res) => {
  await DeliveryPartner.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
