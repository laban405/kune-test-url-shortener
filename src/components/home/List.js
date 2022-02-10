import React from "react";
import styled from "styled-components";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { toast, Slide } from "react-toastify";
import { CopyButton } from "../styles";
import { FaCopy } from "react-icons/fa";

function List({ links, setRecentLinks }) {
  console.log("urls");
  const copy = async (link) => {
    toast.success("Link copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Slide,
    });
    await navigator.clipboard.writeText(link);
  };

  const clearList = () => {
    localStorage.clear();
    setRecentLinks([]);
  };
  return (
    <ListWrapper>
      {links.length > 0 ? (
        <>
          <TitleWrapper>
            <TextItem>Recently Shortened URLS</TextItem>
            <ClearButton onClick={clearList}>Clear</ClearButton>
          </TitleWrapper>
          {/* <ScrollBar component="div"> */}
          <ListContainer>
            {links.map((link) => (
              <ListItem key={link.id}>
                <BodyText>{link.shortUrl}</BodyText>
                <CopyButton onClick={() => copy(link.shortUrl)}>
                  <FaCopy />
                </CopyButton>
              </ListItem>
            ))}
          </ListContainer>
          {/* </ScrollBar> */}
        </>
      ) : (
        <EmptyList>
          <EmptyText>Shortened links will appear here</EmptyText>
        </EmptyList>
      )}
    </ListWrapper>
  );
}

export default List;

const ListContainer = styled.div`
  height: 100%;
  /* overflow: hidden; */
  overflow-y: scroll;
  margin-bottom: 1rem;
  max-height: 450px;
`;
const ListWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  background: #ffffff30;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ListItem = styled.li`
  list-style-type: none;
  padding: 8px;
  margin: 8px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const EmptyList = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextItem = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
  margin-top: 5px;
  text-align: center;
  flex-grow: 1;
`;

const BodyText = styled.p`
  color: ${({ theme }) => theme.colors.fontColor};
  font-size: 1rem;
  flex-grow: 1;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.fontColor};
  font-size: 1rem;
  text-align: center;
  flex-grow: 1;
`;

const ClearButton = styled(CopyButton)`
  margin: 1rem;
  background: red;
`;
