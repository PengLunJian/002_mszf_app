import * as actions from '../../../store/actions';

export const STATES = {
  isLoading: state => state.SELECT_HOUSE_REDUCER.isLoading,
  isSuccess: state => state.SELECT_HOUSE_REDUCER.isSuccess,
  isFailure: state => state.SELECT_HOUSE_REDUCER.isFailure,
  isData: state => state.SELECT_HOUSE_REDUCER.data
};

export const ACTIONS = {
  removeHouseReplace: () => actions.removeHouseReplace(),
  ajaxSelectHouse: params => actions.ajaxRequestSelectHouse(params),
  ajaxDeleteHouse: params => actions.ajaxRequestDeleteHouse(params)
};
