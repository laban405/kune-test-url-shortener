import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Button from "../Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FilteredPropsInputField from "../FilteredPropsInputField";
import { device } from "../GlobalStyles";
import List from "./List";
import { useDispatch, useSelector } from "react-redux";
import { shortenLink } from "../../redux/slices/shortenUrl";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyButton } from "../styles";

function LandingSection() {
  const [loading, setLoading] = useState(false);
  const [shortenedLink, setShortenedLink] = useState("");
  const [recentLinks, setRecentLinks] = useState([]);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const initialValues = {
    longurl: "",
  };

  const validationSchema = Yup.object().shape({
    longurl: Yup.string()
      .url("Enter a valid url")
      .required("This field is required!"),
  });

  const handleShortenLink = async (data) => {
    setLoading(true);
    dispatch(shortenLink({ url: "links", data: JSON.stringify(data) }))
      .unwrap()
      .then((response) => {
        saveShortenedLink(response.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const saveShortenedLink = (newLink) => {
    let links = localStorage.getItem("links")
      ? JSON.parse(localStorage.getItem("links"))
      : "";
    if (links) {
      links = [newLink, ...links];
      localStorage.setItem("links", JSON.stringify(links));
      // setRecentLinks(links);
    } else {
      localStorage.setItem("links", JSON.stringify([newLink]));
    }
    setShortenedLink(newLink);
  };

  const copy = async (event) => {
    event.preventDefault();
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
    await navigator.clipboard.writeText(message);
  };

  useEffect(() => {
    function getStoredLinks() {
      let links = localStorage.getItem("links")
        ? JSON.parse(localStorage.getItem("links"))
        : "";
      console.log("check local links", links);
      if (links) {
        // console.log("local links", links);
        // links = [shortenLink, ...links];
        // localStorage.setItem("links", JSON.stringify(links));
        setRecentLinks(links);
      }
    }
    getStoredLinks();
  }, [shortenedLink]);

  return (
    <Wrapper>
      <ContentWrapper>
        <Title>Keep it brief</Title>
        <SubTitle>Paste your long URL here:</SubTitle>
        <InputWrapper>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // onSubmit={handleShortenUrl}
            // validateOnChange={false}
            validateOnBlur={false}
            onSubmit={async (values, { setSubmitting }) => {
              // console.log(values);
              const data = {
                destination: values.longurl,
                domain: { fullName: "rebrand.ly" },
              };
              // console.log(data);
              await handleShortenLink(data);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              isSubmitting,
              isValidating,
              isValid,
            }) => {
              return (
                <>
                  <Form name="contact" method="post" onSubmit={handleSubmit}>
                    <TextInput
                      name="longurl"
                      type="text"
                      autoCorrect="off"
                      autoComplete="name"
                      placeholder="Enter your url here"
                      valid={touched.longurl && !errors.longurl}
                      error={touched.longurl && errors.longurl}
                    />
                    {errors.longurl && touched.longurl && (
                      <StyledInlineErrorMessage>
                        {errors.longurl}
                      </StyledInlineErrorMessage>
                    )}
                    {message && (
                      <Response>
                        <Message>{message}</Message>
                        <CopyButton onClick={copy}>Copy</CopyButton>
                      </Response>
                    )}
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                      {isSubmitting ? `Submiting...` : `Shorten`}
                    </PrimaryButton>
                  </Form>
                </>
              );
            }}
          </Formik>

          {/* <PrimaryButton> Say Hi!</PrimaryButton> */}
          {/* <SecondaryButton> See My Work</SecondaryButton> */}
        </InputWrapper>
      </ContentWrapper>
      <UrlsList>
        <List links={recentLinks} setRecentLinks={setRecentLinks}></List>
      </UrlsList>
    </Wrapper>
  );
}

export default LandingSection;

const Wrapper = styled.div`
  background: linear-gradient(
    315deg,
    hsla(344, 97%, 63%, 0) 63%,
    hsla(180, 34%, 42%, 0.5) 100%
  );

  background: -moz-linear-gradient(
    315deg,
    hsla(344, 97%, 63%, 0) 63%,
    hsla(180, 34%, 42%, 0.5) 100%
  );

  background: -webkit-linear-gradient(
    315deg,
    hsla(344, 97%, 63%, 0) 63%,
    hsla(180, 34%, 42%, 0.5) 100%
  );
  min-height: 500px;
  width: 100%;
  border-radius: 0px 0px 3px 3px;
  display: grid;

  grid-template-columns: 1fr;
  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media ${device.laptop} {
    padding: 3rem;
  }
`;

const UrlsList = styled.div`
  width: 100%;
  min-height: 500px;
  max-height: 500px;
  padding: 1rem;
`;

const Response = styled.div`
  padding: 8px;
  margin-top: 15px;
  border-radius: 2px;
  background: #90f5ab;
  color: #056608;
  display: flex;
`;

const Message = styled.div`
  text-align: center;
  color: #056608;
  flex-grow: 1;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin: 0;
  margin-bottom: 1rem;
`;

const SubTitle = styled.h5`
  color: ${({ theme }) => theme.colors.fontColor};
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 1.5rem;
`;

const PrimaryButton = styled(Button)`
  margin-top: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 1px 2px 45px -1px ${({ theme }) => theme.colors.primary};
  -webkit-box-shadow: 1px 2px 45px -1px ${({ theme }) => theme.colors.primary};
  -moz-box-shadow: 1px 2px 45px -1px ${({ theme }) => theme.colors.primary};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const TextInput = styled(FilteredPropsInputField)`
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  width: 100%;
  min-width: 300px;
  margin-top: 0.5rem;
  padding: 0.75rem 0.75rem;
  @media ${device.tablet} {
    min-width: 500px;
  }
  @media ${device.laptop} {
    min-width: 450px;
  }

  &:focus,
  &:active {
    box-shadow: rgb(210, 213, 217) 0px 0px 2px 1px,
      rgb(227, 230, 232) 0px 0px 0px 3px;
    border: 1px solid rgb(26, 33, 43);
    outline: none;
  }

  /* Autocomplete styles in Chrome*/
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 0 0 0px 1000px #fff inset;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: black;
  }

  ${({ valid }) =>
    valid &&
    css`
      border: 1px solid rgb(0, 156, 38);

      &:focus,
      &:active {
        border: 1px solid rgb(0, 156, 38);
        box-shadow: rgb(106, 237, 97) 0px 0px 2px 1px,
          rgb(177, 247, 160) 0px 0px 0px 3px;
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid rgb(0, 156, 38);
      }
    `}

  ${({ error }) =>
    error &&
    css`
      border: 1px solid rgb(191, 49, 12);
      outline: none;

      &:focus,
      &:active {
        box-shadow: rgb(244, 129, 116) 0px 0px 2px 1px,
          rgb(251, 178, 174) 0px 0px 0px 3px;
        border: 1px solid rgb(191, 49, 12);
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid rgb(191, 49, 12);
      }
    `}
`;

const StyledInlineErrorMessage = styled.div`
  background-color: rgb(255, 245, 245);
  color: rgb(120, 27, 0);
  display: block;

  padding: 0.5rem 0.75rem;
  margin-top: 0.5rem;
  white-space: pre-line;
`;
