"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

const showOn = ["/", "/about"];
export default function PopUp() {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        onClose();
        return;
      }
      if (showOn.includes(pathname) && !user) onOpen();
    }, 3000);
  }, [onOpen, pathname, user, onClose]);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Talk to a Lawyer Now for £5!
              </ModalHeader>
              <ModalBody>
                <p>
                  Facing a legal challenge? Gain immediate access to
                  professional legal advice for just £5! Our team of experienced
                  lawyers is ready to guide you through your concerns and
                  provide practical solutions. Take control of your legal
                  situation today and get the support you need. Your first step
                  towards resolution is just a click away!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Not now
                </Button>
                <Link href={"/signup"}>
                  <Button color="primary" onPress={onClose}>
                    Get Started
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
