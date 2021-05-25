import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Container,
  Box,
  useMediaQuery
} from '@material-ui/core';
import { GET_ALL_PEOPLE } from '../graphql/queries'

const useStylesTabletOrMobile = makeStyles({
  root: {
    width: '100%',
    paddingRight: '0px',
    paddingLeft: '0px',
    paddingTop: '20px'
  },
  container: {
    //borderRadius: '50px'
    //maxHeight: 440,
  },

  headerCell: {
    backgroundColor: '#272727',
    color: 'white',
    fontWeight: 'bold'
  }
});

const useStyles = makeStyles({
  root: {
    width: '100%',
    paddingRight: '4rem',
    paddingLeft: '4rem',
    paddingTop: '2rem',
  },
  container: {
    //borderRadius: '50px'
    //maxHeight: 440,
  },
  headerCell: {
    backgroundColor: '#272727',
    color: 'white',
    fontWeight: 'bold'
  }
});

function HomePage() {
  const classes = useStyles();
  const classesTabOrMob = useStylesTabletOrMobile();
  const history = useHistory()
  const isTabletOrMobile = useMediaQuery('(max-width: 40em)')

  const [page, setPage] = useState(0)
  const [totalResultsCount, setTotalResultsCount] = useState(0)
  const { loading, error, data, refetch: fetchPeople } = useQuery(GET_ALL_PEOPLE, {
    variables: {
      page: page + 1
    }
  });

  const handlePageChange = (event: unknown, page: number) => {
    setPage(page)
    fetchPeople({ page: page + 1 })
  }

  const handleRowSelect = (name: string) => {
    history.push(`/character?name=${name}`)
  }

  useEffect(() => {
    if (data?.people?.count) {
      setTotalResultsCount(data.people.count)
    }
  }, [
    data
  ])

  const rows = [
    ...(data?.people?.results || [])
  ];

  if (error) return <p>Whoops... something went wrong!</p>

  if (isTabletOrMobile)
    return (
      <Container style={{ backgroundImage: `url("https://i.imgur.com/tJpIAFK.png"),`, backgroundSize: `cover`}}>
        <Box color="yellow" fontWeight="bold" fontSize={25} paddingLeft="2.5rem" paddingTop="20pxS">
          Star Wars Character List
      </Box>
        <Container className={classesTabOrMob.root}>
          <TableContainer className={classesTabOrMob.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }} className={classes.headerCell}>Character Name</TableCell>
                  <TableCell className={classes.headerCell} align="right">Height (cm)</TableCell>
                  <TableCell className={classes.headerCell} align="right">Mass (kg)</TableCell>
                  <TableCell className={classes.headerCell} align="right">Gender</TableCell>
                  <TableCell style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }} className={classes.headerCell} align="right">Homeworld</TableCell>
                </TableRow >
              </TableHead>
              {!loading &&
                <TableBody >
                  {rows.map((row) => (
                    <TableRow style={{ cursor: 'pointer' }} hover onClick={() => handleRowSelect(row.name)} key={row.name}>
                      <TableCell component="th" scope="row" style={{ color: "yellow" }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="right" style={{ color: "yellow" }}>{row.height}</TableCell>
                      <TableCell align="right" style={{ color: "yellow" }}>{row.mass}</TableCell>
                      <TableCell align="right" style={{ color: "yellow" }}>{row.gender}</TableCell>
                      <TableCell align="right" style={{ color: "yellow" }}>{row.homeworld}</TableCell>
                    </TableRow >
                  ))}
                </TableBody>
              }
            </Table>
          </TableContainer>
          {
            loading &&
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="220px" width="100%">
              <CircularProgress title="Loading Characters" />
              <Box padding={4}>
                Loading Characters
        </Box>
            </Box>
          }
          <TablePagination style={{ color: "yellow" }}
            rowsPerPage={10}
            labelRowsPerPage=""
            rowsPerPageOptions={[]}
            component="div"
            count={totalResultsCount}
            page={page}
            onChangePage={handlePageChange
            }
          />
        </Container>
      </Container>
    );

  return (
    <Container style={{ backgroundImage: `url("https://i.imgur.com/tJpIAFK.png")` , backgroundSize: `cover`}}>
      <Box color="yellow" fontWeight="bold" fontSize={30} paddingLeft="4rem" paddingTop="2rem">
        Star Wars Character List
      </Box>
      <Container className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }} className={classes.headerCell}>Character Name</TableCell>
                <TableCell className={classes.headerCell} align="right">Height (cm)</TableCell>
                <TableCell className={classes.headerCell} align="right">Mass (kg)</TableCell>
                <TableCell className={classes.headerCell} align="right">Gender</TableCell>
                <TableCell style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }} className={classes.headerCell} align="right">Homeworld</TableCell>
              </TableRow >
            </TableHead>
            {!loading &&
              <TableBody >
                {rows.map((row) => (
                  <TableRow style={{ cursor: 'pointer' }} hover onClick={() => handleRowSelect(row.name)} key={row.name}>
                    <TableCell component="th" scope="row" style={{ color: "yellow" }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right" style={{ color: "yellow" }}>{row.height}</TableCell>
                    <TableCell align="right" style={{ color: "yellow" }}>{row.mass}</TableCell>
                    <TableCell align="right" style={{ color: "yellow" }}>{row.gender}</TableCell>
                    <TableCell align="right" style={{ color: "yellow" }}>{row.homeworld}</TableCell>
                  </TableRow >
                ))}
              </TableBody>
            }
          </Table>
        </TableContainer>
        {
          loading &&
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="220px" width="100%">
            <CircularProgress title="Loading Characters" />
            <Box padding={4}>
              Loading Characters
        </Box>
          </Box>
        }
        <TablePagination
          style={{ color: "yellow" }}
          rowsPerPage={10}
          labelRowsPerPage=""
          rowsPerPageOptions={[]}
          component="div"
          count={totalResultsCount}
          page={page}
          onChangePage={handlePageChange}
        />
      </Container>
    </Container>
  );
}

export default HomePage;
