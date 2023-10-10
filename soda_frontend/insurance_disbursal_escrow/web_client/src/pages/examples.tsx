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


const Examples: NextPage = (props) => {
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
       <div className="flex justify-center py-10">
        <h1 className="sm:text-3xl text-2xl font-extrabold mb-4 text-white">
          Call Instructions of Your IDL By a Clicking a Button
        </h1>
      </div>
      <div className="flex justify-center">
        <h1 className="sm:text-3xl text-2xl font-extrabold mb-4 text-white">
          Powered By SODA
        </h1>
      </div>
    <div className="text-white flex flex-col text-2xl m-5 p-2 ">
        <div className="min-h-screen bg-inherit py-1 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className=" mx-auto">
                <div className="flex items-center space-x-5">
                  <div className="h-16 w-16 p-2 bg-black rounded-full flex flex-shrink-0 justify-center items-center text-3xl font-mono">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/soda.png?alt=media&token=32de0266-c1ee-4a31-a2e1-2df6d35086f8"
                      alt="ff"
                    />
                  </div>
                  <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed mt-8">For initialize instructions</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed invisible">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    
                    <button 
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-3 text-xl py-1 rounded-md focus:outline-none"
                    onClick={
                      ()=>initialize(program ,  rainfallData_for_initialize   , user_for_initialize   ,   systemProgram ,)
                    }
                    >
                       Call_initialize_instruction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="text-white flex flex-col text-2xl m-5 p-2 ">
        <div className="min-h-screen bg-inherit py-1 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className=" mx-auto">
                <div className="flex items-center space-x-5">
                  <div className="h-16 w-16 p-2 bg-black rounded-full flex flex-shrink-0 justify-center items-center text-3xl font-mono">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/soda.png?alt=media&token=32de0266-c1ee-4a31-a2e1-2df6d35086f8"
                      alt="ff"
                    />
                  </div>
                  <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed mt-8">For checkEligibility instructions</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed invisible">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    
                    <button 
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-3 text-xl py-1 rounded-md focus:outline-none"
                    onClick={
                      ()=>checkEligibility(program ,  rainfallData_for_checkEligibility   ,)
                    }
                    >
                       Call_checkEligibility_instruction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="text-white flex flex-col text-2xl m-5 p-2 ">
        <div className="min-h-screen bg-inherit py-1 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className=" mx-auto">
                <div className="flex items-center space-x-5">
                  <div className="h-16 w-16 p-2 bg-black rounded-full flex flex-shrink-0 justify-center items-center text-3xl font-mono">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/soda.png?alt=media&token=32de0266-c1ee-4a31-a2e1-2df6d35086f8"
                      alt="ff"
                    />
                  </div>
                  <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed mt-8">For instructVaultToDisburseClaim instructions</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed invisible">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                      <p className="">amount</p>
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder={`Enter amount`}
                        value={
                          amount_for_instructVaultToDisburseClaim
                        }
                        onChange={
                          amounthandler_for_instructVaultToDisburseClaim
                        }
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex items-center space-x-4">
                    
                    <button 
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-3 text-xl py-1 rounded-md focus:outline-none"
                    onClick={
                      ()=>instructVaultToDisburseClaim(program , amount_for_instructVaultToDisburseClaim ,  rainfallData_for_instructVaultToDisburseClaim   , solVaultProgram_for_instructVaultToDisburseClaim   , owner_for_instructVaultToDisburseClaim   , vault_for_instructVaultToDisburseClaim   , state_for_instructVaultToDisburseClaim   , user_for_instructVaultToDisburseClaim   ,   systemProgram ,)
                    }
                    >
                       Call_instructVaultToDisburseClaim_instruction
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default Examples;
