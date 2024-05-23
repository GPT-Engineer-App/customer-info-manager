import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const toast = useToast();

  const handleAddCustomer = () => {
    if (name === "" || email === "" || phone === "") {
      toast({
        title: "All fields are required.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newCustomer = { name, email, phone };
    if (editingIndex !== null) {
      const updatedCustomers = [...customers];
      updatedCustomers[editingIndex] = newCustomer;
      setCustomers(updatedCustomers);
      setEditingIndex(null);
    } else {
      setCustomers([...customers, newCustomer]);
    }

    setName("");
    setEmail("");
    setPhone("");
  };

  const handleEditCustomer = (index) => {
    const customer = customers[index];
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setEditingIndex(index);
  };

  const handleDeleteCustomer = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <HStack spacing={4} width="100%">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Button onClick={handleAddCustomer}>{editingIndex !== null ? "Update" : "Add"}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.map((customer, index) => (
              <Tr key={index}>
                <Td>{customer.name}</Td>
                <Td>{customer.email}</Td>
                <Td>{customer.phone}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditCustomer(index)} />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteCustomer(index)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
