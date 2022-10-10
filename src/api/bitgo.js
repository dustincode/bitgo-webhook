/* eslint-disable no-console */
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.post('/webhook', async (req, res) => {
  const { headers, body } = req;
  const { transfer, state, coin } = body;

  await supabase.from('bitgo_webhook').insert([
    {
      transaction_id: transfer,
      status: state,
      coin,
      header: headers,
      body,
      res_status: 200,
    },
  ]);

  res.json({ message: 'OK' });
});

router.post('/webhook-error', async (req, res) => {
  const { headers, body } = req;
  const { transfer, state, coin } = body;

  await supabase.from('bitgo_webhook').insert([
    {
      transaction_id: transfer,
      status: state,
      coin,
      header: headers,
      body,
      res_status: 500,
    },
  ]);

  res.status(500).json({ message: 'Internal Server Error!' });
});

module.exports = router;
