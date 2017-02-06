import BaseStore from './BaseStore';

class AnalyticsStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._ageData = this._doctorData = this._genderData = {};
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case 'SET_AGE_DATA':
        this._formatAgeData(action.data);
        this.emitChange();
        break;
      case 'SET_DOCTOR_DATA':
        this._doctorData = action.data;
        this.emitChange();
        break;
      case 'SET_GENDER_DATA':
        this._genderData = action.data;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  _formatAgeData(data) {
    var chartLabels = [];
    var chartData = [];
    if (typeof(data) === 'object' && data.data) {
      data.data.forEach(function(bar) {
        chartLabels.push(bar.age);
        chartData.push(bar.patients);
      });
    }

    this._ageData = {
      labels: chartLabels,
      datasets: [
        {
          data: chartData
        }
      ]
    };
  }

  get ages() {
    return this._ageData;
  }

  get doctors() {
    return this._doctorData;
  }

  get genders() {
    return this._genderData;
  }
}

export default new AnalyticsStore();
