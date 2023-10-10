import { FC, useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useProgram } from "../utils/useProgram";
import { useRouter } from "next/router"

import {
  initialize
} from '../utils/callInstructions'
import {
  checkEligibility
} from '../utils/callInstructions'
import {
  instructVaultToDisburseClaim
} from '../utils/callInstructions'


const Home: NextPage = (props) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { program } = useProgram({ connection, wallet });

// React UseStates hooks for managing args 
//for initialize
//for checkEligibility
//for instructVaultToDisburseClaim
const [amount_for_instructVaultToDisburseClaim , setamount_for_instructVaultToDisburseClaim] = useState()

//handler functions for inputs feilds
const amounthandler_for_instructVaultToDisburseClaim = (e) => {
  setamount_for_instructVaultToDisburseClaim(e.target.value)
}

// variables for account 
const authority = ""
const systemProgram = ""
const clock = ""
const rainfallData_for_initialize = ""
const user_for_initialize = ""
const rainfallData_for_checkEligibility = ""
const rainfallData_for_instructVaultToDisburseClaim = ""
const solVaultProgram_for_instructVaultToDisburseClaim = ""
const owner_for_instructVaultToDisburseClaim = ""
const vault_for_instructVaultToDisburseClaim = ""
const state_for_instructVaultToDisburseClaim = ""
const user_for_instructVaultToDisburseClaim = ""



  return (
    <>
      <Head>
        <title>insurance_disbursal_escrow</title>
        <meta name="description" content="insurance_disbursal_escrow" />
      </Head>
    </>
  );
};

export default Home;
