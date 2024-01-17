"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { supabase } from "@/app/supabaseClient";
import { sAlert } from "@/app/utils/helpers";
import { Chat, ChatMessage, User } from "@/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function RequestForCall({
  chat,
  isCallReqOpen,
  setIsCallReqOpen,
}: {
  chat: Chat;
  setIsPopoverOpen: any | null;
  isCallReqOpen: boolean;
  setIsCallReqOpen: any | null;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isCallReqOpen);
  }, [isCallReqOpen]);

  if (!user || !chat) return;

  const handRequestForCall = async () => {
    if (!chat) return;
    const callReqData = {
      status: "requested",
      customer: user,
      admin: chat.chatUsers.find((id: number) => id !== user?.id),
    };
    const { error } = await supabase.from("callRequests").insert(callReqData);

    if (error) {
      console.log(error);
      sAlert(error.message);
    } else {
      try {
        const createChatMessage: Partial<ChatMessage> = {
          chatId: chat.id,
          message: `${user?.username} requested for a call`,
          type: `text`,
          replyTo: null,
          userId: user.id,
          toUserId: chat.chatUsers.find((id: number) => id !== user?.id),
          userName: 'system',
          userProfilePicture: user?.userProfilePicture || "",
          sender: "user",
        };
        await supabase.from("chat_messages").insert(createChatMessage);
        await supabase
          .from("chats")
          .update({ updatedAt: new Date() })
          .eq("id", chat.id);
        sAlert("You have successfully requested a call");
      } catch (error: any) {
        sAlert(error.message);
      }
    }

    setLoading(false);
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
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isLoading={loading}
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
