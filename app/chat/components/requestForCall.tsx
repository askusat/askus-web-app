"use client";

import { AMOUNT_FOR_CALL_REQUEST } from "@/app/config";
import { useAuth } from "@/app/hooks/useAuth";
import { supabase } from "@/app/supabaseClient";
import { sAlert } from "@/app/utils/helpers";
import { Chat, ChatMessage, createOfferProps } from "@/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function RequestForCall({
  chat,
  isCallReqOpen,
  setIsCallReqOpen,
  setRefreshChatMessage,
  setSendingMessage,
}: {
  chat: Chat;
  setIsPopoverOpen: any | null;
  isCallReqOpen: boolean;
  setIsCallReqOpen: any | null;
  setRefreshChatMessage: any | null;
  setSendingMessage: any | null;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setphone] = useState("");

  useEffect(() => {
    setIsOpen(isCallReqOpen);
  }, [isCallReqOpen]);

  if (!user || !chat) return;

  const handRequestForCall = async () => {
    if (!chat) return;
    if (!phone) {
      sAlert("Please enter a phone number");
      return;
    }

    setLoading(true);

    const _continue = async () => {
      const callReqData = {
        status: "requested",
        customer: user,
        admin: chat.chatUsers.find((id: number) => id !== user?.id),
      };
      const { error } = await supabase.from("callRequests").insert(callReqData);

      if (error) {
        console.log(error);
        sAlert(error.message);
        setLoading(false);
      } else {
        try {
          const createChatMessage: Partial<ChatMessage> = {
            chatId: chat.id,
            message: `${user?.username} requested for a call. phone: ${phone}`,
            type: `text`,
            replyTo: null,
            userId: user.id,
            toUserId: chat.chatUsers.find((id: number) => id !== user?.id),
            userName: "system",
            userProfilePicture: user?.userProfilePicture || "",
            sender: "user",
          };
          await supabase.from("chat_messages").insert(createChatMessage);
          await supabase
            .from("chats")
            .update({ updatedAt: new Date() })
            .eq("id", chat.id);
          sAlert("Your requested for a call will be seen by the expert.");
          setLoading(false);
          setIsCallReqOpen(false);
          setRefreshChatMessage(true);
          setSendingMessage(true);
        } catch (error: any) {
          setLoading(false);
          sAlert(error.message);
        }
      }
    };

    try {
      const createCallReqData: createOfferProps = {
        route: "pay_for_custom_offer",
        customer_id: user.stripeCustomerId || "",
        amount: AMOUNT_FOR_CALL_REQUEST,
        email: user.email,
        description: `${user?.stripeCustomerId} requested for a call. For £${AMOUNT_FOR_CALL_REQUEST}`,
      };

      const createCallReqRes = await axios.post(
        `/api/stripe`,
        createCallReqData
      );

      if (createCallReqRes.status === 200) {
        await _continue();
      } else {
        console.log("createCallRqRes");
        console.log(createCallReqRes);
        sAlert("something went wrong");
        setLoading(false);
      }
      return;
    } catch (error: any) {
      setLoading(false);
      sAlert(`${error?.response?.data?.message || error.message}`);
      console.log("failed to create offer due to: ");
      console.log(error);
      return {
        statusText: "failed",
        message: error?.response?.data?.message || error.message,
      };
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          setIsCallReqOpen(open);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Request for a call
              </ModalHeader>
              <ModalBody>
                <p>
                  You can request for a call for just £50 which will be billed
                  on your credit card.
                </p>
                <Input
                  placeholder="phone number"
                  value={phone}
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  disabled={loading}
                >
                  Not now
                </Button>
                <Button
                  color="primary"
                  onPress={handRequestForCall}
                  isLoading={loading}
                >
                  Request
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
