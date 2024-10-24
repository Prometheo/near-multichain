import { useState } from 'react';

import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

export const TransferForm = forwardRef(
  ({ props: { Eth, senderAddress, loading } }, ref) => {
    const [receiver, setReceiver] = useState(
      '0xe0f3B7e68151E9306727104973752A415c2bcbEb'
    );
    const [amount, setAmount] = useState(0.005);

    useImperativeHandle(ref, () => ({
      async createPayload() {
        const { transaction, payload } = await Eth.createPayload(
          senderAddress,
          receiver,
          amount,
          undefined
        );
        return { transaction, payload };
      },
      async afterRelay() {},
    }));

    return (
      <>
        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label text-end'>To:</label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <div>
            <div className='row mb-3'>
              <label className='col-sm-2 col-form-label text-end'>Amount:</label>
              <div className='col-sm-10'>
                <div className='input-group'>
                  <input
                    type='number'
                    className='form-control'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step='0.01'
                    disabled={loading}
                  />
                  <span className='input-group-text bg-warning text-white'>ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

TransferForm.propTypes = {
  props: PropTypes.shape({
    senderAddress: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    Eth: PropTypes.shape({
      createPayload: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

TransferForm.displayName = 'TransferForm';
