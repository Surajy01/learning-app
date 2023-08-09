import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Box,
  Input,
  IconButton,
  useBreakpointValue,
  Text,
  Link,
  Button
} from "@chakra-ui/react";
import { FaSearch, FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router";
import CustomSelect from "./NavbarComponents/CustomSelect";
import SearchbarCard from "./LandingPageComponents/SearchbarCard";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const navigate = useNavigate();
  const { cart } = useSelector((store) => store.cartReducer);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);

  // Debouncing logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchResults();
      } else {
        setSearchResults([]);
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://anxious-bull-glasses.cyclic.app/course?search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setSearchResults(data.course);
      setIsLoading(false);
      setShowResults(true); // Show search results when they are available
    } catch (error) {
      console.error("Error fetching search results:", error);
      setIsLoading(false);
    }
  }

  const token = localStorage.getItem("frontendtoken");

  const handleLogout = () => {
    localStorage.removeItem("frontendtoken");
    // window.location.reload();
    navigate("/")

  };

  // Responsive font sizes for text
  const fontSize = useBreakpointValue({
    base: "10px",
    sm: "12px",
    md: "13px",
    lg: "15px",
    xl: "16px",
  });

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p={"4px 3px"}
      bg="white" //white
      // boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      position="fixed"
      width="100%"
      zIndex={5}
    >
      <Flex
        align="center"
        gap={10}
        _hover={{ cursor: "pointer" }}
        width={{
          sm: "25%",
          md: "28%",
          lg: "32%",
        }}
      >
        <Box onClick={() => navigate("/")}>
          <Text fontSize={"2xl"} fontWeight="extrabold" color="#a435f0">
            SKILL HUB
          </Text>
        </Box>
        {!isMobile && (
          <Box ml={4}>
            <CustomSelect />
          </Box>
        )}
      </Flex>

      {!isMobile ? (
        <Flex align="center" flex={1} mr={10}>
          <Box flex={1}>
            {/* Search Bar */}
            <Input
              type="text"
              variant="filled"
              border="1px solid black"
              color="black"
              placeholder="Search For Anything"
              _placeholder={{ color: "#555454" }}
              w="100%"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowResults(true)} // Show search results on focus
            />
          </Box>
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            bg="#a435f0"
            color="white"
            borderRightRadius="7px"
          />
        </Flex>
      ) : (
        <Flex align="center">
          <IconButton
            aria-label="Menu"
            icon={<FaBars />}
            bg="transparent"
            color="#a435f0"
            fontSize="2xl"
            mr={2}
          />
        </Flex>
      )}

      {isMobile && (
        <IconButton
          aria-label="Search"
          icon={<FaSearch />}
          color="black"
          borderRadius="7px"
          _hover={{ backgroundColor: "#9a03fe", color: "white" }}
        />
      )}

      {!isMobile && (
        <Flex align="center">
          <Box mr={4}>
            <Link
              _hover={{ color: "#a435f0", textDecoration: "underline" }}
              href="/enterprise"
              fontSize={fontSize}
            >
              Skill Hub Business
            </Link>
          </Box>
          <Box mr={4}>
            <Link
              _hover={{ color: "#a435f0", textDecoration: "underline" }}
              href="/universities"
              fontSize={fontSize}
            >
              Teach on Skill Hub
            </Link>
          </Box>
          <Box mr={4}>
            <Link
              textDecoration="none"
              color="#a435f0"
              href="/cart"
              fontSize={fontSize}
            >
              <AiOutlineShoppingCart size='30px'/><Box
    position="absolute"
    top="8px"
    right="210px"
    bg="#a435f0"
    color="white"
    borderRadius="50%"
    width="20px"
    height="20px"
    display="flex"
    justifyContent="center"
    alignItems="center"
    fontSize="12px"
  >
    
    {cart.length}
  </Box>
            </Link>
          </Box>

          {token ? (
            <>
            <Link href="/mylearning"
              textDecoration="none"
              marginRight="10px"
              padding="10px"
              _hover={{
                bgColor: "white",
                color: "#9904fc",
                border: "2px solid #9904fc",
                // textDecoration: "none",
              }}
              borderRadius="5px"
              // fontWeight="bold"
              color="white"
              bg="#a435f0"
              display={{ base: "none", md: "block" }}
            
            >My Learning</Link>
            <Button
              marginRight="10px"
              padding="10px"
              _hover={{
                bgColor: "white",
                color: "#9904fc",
                border: "2px solid #9904fc",
                textDecoration: "none",
              }}
              borderRadius="5px"
              // fontWeight="bold"
              color="white"
              bg="#a435f0"
              display={{ base: "none", md: "block" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            </>
          ) : (
            <Box display={"flex"}>
              <Link
                href="/signin"
                textDecoration="none"
                marginRight="10px"
                padding="10px"
                _hover={{
                  bgColor: "white",
                  color: "#9904fc",
                  border: "2px solid #9904fc",
                  // textDecoration: "none",
                }}
                borderRadius="5px"
                // fontWeight="bold"
                color="white"
                bg="#a435f0"
                display={{ base: "none", md: "block" }}
              >
                Login
              </Link>

              {/* Join for Free Button */}
              <Link
                bg="#a435f0"
                color="white"
                borderRadius="5px"
                _hover={{
                  bgColor: "white",
                  color: "#9904fc",
                  border: "2px solid #9904fc",
                }}
                href="/signup"
                p={"10px 7px"}
                fontSize={fontSize}
              >
                Join for free
              </Link>
            </Box>
          )}
        </Flex>
      )}

      {/* Display search results in a dropdown */}
      {showResults && searchResults?.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left="50%"
          transform="translateX(-50%)"
        >
          <Box
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            p={4}
            borderRadius="4px"
            zIndex={99}
          >
            {isLoading ? (
              <Flex>
                {" "}
                <Text size={"5xl"}>Loading...</Text>
              </Flex>
            ) : (
              searchResults?.map((result) => (
                <SearchbarCard key={result._id} {...result} />
              ))
            )}
          </Box>
        </Box>
      )}
    </Flex>
  );
}