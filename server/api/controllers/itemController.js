const Item = require("../model/Item");

exports.getAllItems = async (req, res) => {
  try {
    let items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOneItem = async (req, res) => {
    try {
        const id = req.params.ItemId;
        let item = await Item.findOne({_id : id});
        res.status(200).json(item);
    } catch (err) {
    res.status(500).json(err);
  }
}

exports.addNewItem = async (req, res) => {
  try {
    const item = new Item({
        name:req.body.name,
        description:req.body.description,
        foundDate:req.body.foundDate,
        img:req.file
    });
    
    let newItem = await item.save();
    res.status(200).json({ data: newItem });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
/* TODO: Gérer la modification
exports.editItem = (req, res, next) => {
  const id = req.params.ItemId;
  let result = await Item.updateOne({ _id: id});
  const itemObject = req.file ?
    {
      ...JSON.parse(req.body.item),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Item.updateOne({ _id: id }, { ...itemObject, _id: id })
    .then(() => res.status(200).json({ itemObject }))
    .catch(error => res.status(400).json({ error }));
};
*/
exports.editItem = async (req, res) => {
  try {
  const id = req.params.ItemId;
  let updatedItem = req.body.item;
  let result = await updatedItem.updateOne({ _id: id});
  res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.ItemId;
    let result = await Item.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};