import {handleActions} from 'redux-actions';
import * as actionTypes from '../actionTypes';
import * as utils from '../../utils';
import * as states from '../states';

const actions = {
  [actionTypes.SELECT_HOUSE_REQUEST](state) {
    return {
      ...state,
      isLoading: true,
      isSuccess: false,
      isFailure: false
    };
  },
  [actionTypes.SELECT_HOUSE_SUCCESS](state, action) {
    const oldData = state.data || {};
    const oldRows = oldData.rows || [];
    const newData = action.data || {};
    const newRows = newData.rows || [];
    const rows = newRows.map((item) => {
      return utils.dataFormat(item);
    });
    action.data.rows = oldRows.concat(rows);
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      isFailure: false,
      data: action.data
    };
  },
  [actionTypes.SELECT_HOUSE_FAILURE](state) {
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      isFailure: true
    };
  },
  [actionTypes.INSERT_HOUSE_REPLACE](state, params) {
    let oldData = state.data;
    let {rows, totalCount} = oldData;
    let newData = params.data;
    rows.unshift(newData);
    totalCount++;
    let data = {...oldData, rows, totalCount};
    return {
      ...state,
      data
    };
  },
  [actionTypes.DELETE_HOUSE_REPLACE](state, params) {
    let oldData = state.data;
    let {rows, totalCount} = oldData;
    let newData = params.data;
    rows = rows.filter((item) => {
      return item.id !== newData.id;
    });
    totalCount--;
    let data = {...oldData, rows, totalCount};
    return {
      ...state,
      data
    };
  },
  [actionTypes.UPDATE_HOUSE_REPLACE](state, params) {
    const oldData = state.data;
    const oldRows = oldData.rows || [];
    const newData = params.data;
    const rows = oldRows.map((item) => {
      if (item.id === newData.id) {
        return {...item, ...newData};
      }
      return item;
    });
    const data = {...oldData, rows};
    return {
      ...state,
      data
    };
  },
  [actionTypes.REMOVE_HOUSE_REPLACE](state) {
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      isFailure: false,
      data: null
    };
  }
};

const SELECT_HOUSE_REDUCER = handleActions(actions, states.SELECT_HOUSE_STATE);

export default SELECT_HOUSE_REDUCER;
