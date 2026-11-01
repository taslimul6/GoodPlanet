
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Users, CheckCircle2 } from "lucide-react";

const JoinBtn = () => {


  return (
    <>
      {/* Participants */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Event participation</h3>
          <Users className="size-5 text-pri" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-3xl font-extrabold">22</p>
            <p className="mt-1 text-sm text-mut">People joined</p>
          </div>

          <p className="text-sm font-semibold text-pri">

            100
            {/* {capacity > 0
              ? `${availableSeats} seats left`
              : "No capacity limit"} */}
          </p>
        </div>

        {/* Progress */}
        {/* {capacity > 0 && (
          <>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-pri/10">
              <div
                className="h-full rounded-full bg-pri transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-mut">
              <span>{Math.round(progress)}% filled</span>
              <span>{capacity} capacity</span>
            </div>
          </>
        )} */}
      </div>

      {/* Join / Cancel Button */}
      <Button
        // onClick={handleJoin}
        
        className={`mt-7 h-12 w-full rounded-full font-bold `}
       
            
           
      
      >
        
            <CheckCircle2 className="mr-2 size-4" />
            Cancel Participation
          
        
      </Button>

        
        <p className="mt-3 text-center text-xs text-pri">
          You are participating in this event.
        </p>
      
    </>
  );
};

export default JoinBtn;
