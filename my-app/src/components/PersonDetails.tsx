import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory, useLocation } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Container,
  Box,
} from '@material-ui/core'
import qs from 'qs'
import { GET_PERSON } from '../graphql/queries'
import { FCProps } from '../types'

// @ts-ignore
const CharacterDetailWrapper: FC<FCProps> = ({ children }) => (
  // @ts-ignore
  <Container style={{ margin: 0, paddingBottom: '2rem', paddingLeft: 0, }}>
    {children}
  </Container>
)

// @ts-ignore
const CharacterDetailHeading: FC<FCProps> = ({ children }) => (
  // @ts-ignore
  <Box borderRadius="5px" display="flex" alignItems="center" paddingLeft={1} paddingTop={1} paddingBottom={1} style={{ backgroundColor: '#272727', color: 'white' }}>
    {children}
  </Box>
)

// @ts-ignore
const CharacterDetailInfo: FC<FCProps> = ({ children }) => (
  // @ts-ignore
  <Box marginTop="5px" marginLeft="10px" style={{color: "yellow"}}>
    {children}
  </Box>
)

const CharacterDetails = () => {
  const history = useHistory()
  const location = useLocation()

  var queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { name } = queryParams

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: {
      name
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });

  const character = data?.person

  if (error) return <p>Whoops... something went wrong!</p>

  return (
    <Container style={{backgroundImage: `url("https://i.imgur.com/tJpIAFK.png")`}}>
      {
        loading ? (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="220px" width="100%">
            <CircularProgress title="Loading Characters" />
            <Box padding={4}>
              Loading Character Details...
        </Box>
          </Box>
        ) : (
          <Container>
            <Box paddingTop={2}>
              <Button color="inherit" variant="contained" onClick={() => history.goBack()}>Go Back</Button>
            </Box>
            <h1 style={{ color: 'yellow' }}>
              {character?.name}
            </h1>

            <CharacterDetailWrapper>
              <>
                <CharacterDetailHeading>
                  Birth Year
              </CharacterDetailHeading>
                <CharacterDetailInfo>
                  {character?.birth_year}
                </CharacterDetailInfo>
              </>
            </CharacterDetailWrapper>

            <CharacterDetailWrapper>
              <>
                <CharacterDetailHeading>
                  Gender
              </CharacterDetailHeading>
                <CharacterDetailInfo>
                  {character?.gender}
                </CharacterDetailInfo>
              </>
            </CharacterDetailWrapper>

            <CharacterDetailWrapper>
              <>
                <CharacterDetailHeading>
                  Height (cm)
              </CharacterDetailHeading>
                <CharacterDetailInfo>
                  {character?.height}
                </CharacterDetailInfo>
              </>
            </CharacterDetailWrapper>

            <CharacterDetailWrapper>
              <>
                <CharacterDetailHeading>
                  Mass (kg)
              </CharacterDetailHeading>
                <CharacterDetailInfo>
                  {character?.mass}
                </CharacterDetailInfo>
              </>
            </CharacterDetailWrapper>

            <CharacterDetailWrapper>
              <>
                <CharacterDetailHeading>
                  Homeworld
              </CharacterDetailHeading>
                <CharacterDetailInfo>
                  {character?.homeworld}
                </CharacterDetailInfo>
              </>
            </CharacterDetailWrapper>

            <CharacterDetailWrapper>
              <>
                <CharacterDetailHeading>
                  Hair Color
              </CharacterDetailHeading>
                <CharacterDetailInfo>
                  {character?.hair_color}
                </CharacterDetailInfo>
              </>
            </CharacterDetailWrapper>

            <CharacterDetailWrapper>
              <>
                <CharacterDetailHeading>
                  Eye Color
              </CharacterDetailHeading>
                <CharacterDetailInfo>
                  {character?.eye_color}
                </CharacterDetailInfo>
              </>
            </CharacterDetailWrapper>

            <CharacterDetailWrapper>
              <>
                <CharacterDetailHeading>
                  Skin Color
              </CharacterDetailHeading>
                <CharacterDetailInfo>
                  {character?.skin_color}
                </CharacterDetailInfo>
              </>
            </CharacterDetailWrapper>
          </Container>
        )
      }
    </Container>
  );
}

export default CharacterDetails;
