"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { supabase } from "@/app/supabaseClient";
import { sAlert } from "@/app/utils/helpers";
import { Chat, ChatMessage, Offer, User, createOfferProps } from "@/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CreatOfferModel({
  chat,
  isCreatOfferOpen,
  setIsCreatOfferOpen,
}: {
  chat: Chat;
  setIsPopoverOpen: any | null;
  isCreatOfferOpen: boolean;
  setIsCreatOfferOpen: any | null;
}) {
  const { user } = useAuth();
  const [dbCustomer, setDbCustomer] = useState<User>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<string>("0");

  useEffect(() => {
    const fetch = async () => {
      if (!user || !chat?.userId) return;
      const customerId = chat?.userId;

      if (!customerId) {
        sAlert(`${customerId} not found in db!`);
        return;
      }
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", customerId)
        .single();
      !error && setDbCustomer(data);
      error && sAlert(error.message);
    };
    fetch();
  }, [chat?.userId, user]);

  useEffect(() => {
    setIsOpen(isCreatOfferOpen);
  }, [isCreatOfferOpen]);

  if (!user || !chat) return;

  const addOfferToChat = async (offerData: Offer) => {
    try {
      const createChatMessage: Partial<ChatMessage> = {
        chatId: offerData?.chat,
        message: offerData?.description,
        type: `offer_${amount}`,
        replyTo: null,
        userId: user.id,
        toUserId: offerData?.customer,
        userName: user.username, //getFirstName(user.fullName),
        userProfilePicture: 'pending',
        sender: user.isAdmin ? "expert" : "user",
      };
      await supabase.from("chat_messages").insert(createChatMessage);
      await supabase
        .from("chats")
        .update({ updatedAt: new Date() })
        .eq("id", offerData?.chat);
    } catch (error: any) {
      sAlert(error.message);
    }
  };

  const handCreatOfferModel = async () => {
    if (!chat) return;
    if (Number(amount) < 1) {
      return sAlert("Amount must be greater than £1");
    }

    setLoading(true);
    const offerData: Offer = {
      chat: chat.id || 0,
      customer: dbCustomer?.id || 0,
      stripeCustomerId: dbCustomer?.stripeCustomerId || "",
      email: dbCustomer?.email || "",
      sender: user?.id || 0,
      amount: Number(amount),
      status: "pending",
      description,
    };

    const { error } = await supabase.from("offers").insert(offerData);

    if (!error) {
      sAlert("offer created successfully!");
      await addOfferToChat(offerData);
      setLoading(false);
      setIsCreatOfferOpen(false);
    } else {
      setLoading(false);
      sAlert(error.message);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          setIsCreatOfferOpen(open);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create an offer for {dbCustomer?.username}.
              </ModalHeader>
              <ModalBody>
                <Textarea
                  placeholder="Offer description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <div className="flex items-center gap-2">
                  <div className="text-xl">£</div>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={amount}
                    size="sm"
                    className="w-fit"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (!isNaN(Number(inputValue))) {
                        setAmount(inputValue);
                      }
                    }}
                  />
                </div>
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
                  onPress={handCreatOfferModel}
                  isLoading={loading}
                >
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
