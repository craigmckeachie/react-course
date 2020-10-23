export class Project {
  constructor(initializer) {
    this.id = undefined;
    this.name = '';
    this.description = '';
    this.imageUrl = '';
    this.contractTypeId = null;
    this.contractSignedOn = new Date();
    this.budget = 0;
    this.isActive = false;
    this.isNew = () => {
      return this.id === undefined;
    };
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.description) this.description = initializer.description;
    if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
    if (initializer.contractTypeId)
      this.contractTypeId = initializer.contractTypeId;
    if (initializer.contractSignedOn)
      this.contractSignedOn = initializer.contractSignedOn;
    if (initializer.budget) this.budget = initializer.budget;
    if (initializer.isActive) this.isActive = initializer.isActive;
  }
}
