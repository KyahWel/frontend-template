export const TField = {
  TEXT: "TEXT",
  SELECT: "SELECT",
  FILE: "FILE",
  IMAGE: "IMAGE",
  BELONGS_TO: "BELONGS_TO",
  HAS_MANY: "HAS_MANY",
  DATETIME: "DATETIME",
  TAG: "TAG",
  ASSOCIATION: "ASSOCIATION"
};

class Field {
  constructor(type, label, index, value = null, associates = []) {
      this.type = type;
      this.label = label;
      this.index = index;
      this.value = value;
      this.associates = associates;
      this.rules = [];
      this.isVisibleFromDetails = true;
      this.isVisibleFromIndex = true;
      this.isVisibleWhenCreating = true;
      this.isVisibleWhenUpdating = true;
  }

  setDefault(value) {
      this.value = value;
      return this;
  }

  setRules(value) {
      this.rules = value;
      return this;
  }

  hideFromIndex(cb = () => true) {
      this.isVisibleFromIndex = !cb();
      return this;
  }

  hideFromDetails(cb = () => true) {
      this.isVisibleFromDetails = !cb();
      return this;
  }

  hideWhenCreating(cb = () => true) {
      this.isVisibleWhenCreating = !cb();
      return this;
  }

  hideWhenUpdating(cb = () => true) {
      this.isVisibleWhenUpdating = !cb();
      return this;
  }

  onlyOnForm(cb = () => true) {
      this.isVisibleFromDetails = !cb();
      this.isVisibleFromIndex = !cb();
      return this;
  }
}

class FileField extends Field {
  static make(label, index, value) {
      return new FileField(TField.FILE, label, index, value);
  }
}

class ImageField extends FileField {
  static make(label, index, value) {
      return new ImageField(TField.IMAGE, label, index, value);
  }
}

class TextField extends Field {
  static make(label, index, value) {
      return new TextField(TField.TEXT, label, index, value);
  }
}

class AssociationField extends Field {
  static make(label, index, value, associates) {
      return new AssociationField(TField.ASSOCIATION, label, index, value, associates);
  }
}

class DateTimeField extends Field {
  static make(label, index, value) {
      return new DateTimeField(TField.DATETIME, label, index, value);
  }
}

class TagField extends Field {
  static make(label, index, value) {
      return new TagField(TField.TAG, label, index, value);
  }
}

class SelectField extends Field {
  constructor(type, label, index, value, options = []) {
      super(type, label, index, value);
      this.options = options;
  }

  static make(label, index, value, options = []) {
      let instance = new SelectField(TField.SELECT, label, index, value, options);
      return instance;
  }

  setOptions(newOptions) {
      this.options = newOptions;
      return this;
  }
}

class BelongsToField extends SelectField {
  constructor(type, label, index, value, options = []) {
      super(type, label, index, value, options);
      this.prop = '';
      this.as = '';
      this.model = '';
  }

  static make(label, index, value, options = []) {
      let instance = new BelongsToField(TField.BELONGS_TO, label, index, value, options);
      return instance;
  }

  setAs(as) {
      this.as = as;
      this.model = this.model || `${as[0].toUpperCase()}${as.slice(1)}`;
      return this;
  }

  setProp(prop) {
      this.prop = prop;
      return this;
  }

  setModel(model) {
      this.model = model;
      return this;
  }
}

export default () => {
  return {
      makeSelectField: (label, index, options = [], value) => SelectField.make(label, index, value, options),
      makeBelongsToField: (label, index, options = [], value) => BelongsToField.make(label, index, value, options),
      makeTextField: (label, index, value) => TextField.make(label, index, value),
      makeAssociationField: (label, index, value, associates) => AssociationField.make(label, index, value, associates),
      makeFileField: (label, index, value) => FileField.make(label, index, value),
      makeImageField: (label, index, value) => ImageField.make(label, index, value),
      makeDateField: (label, index, value) => DateTimeField.make(label, index, value),
      makeTagField: (label, index, value) => TagField.make(label, index, value)
  };
};
