"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { Chat, User } from "@/types";
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

    setLoading(true);
    // setIsCallReqOpen(false);
    // setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
