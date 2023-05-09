import _ from "lodash";
import {
  FlatList,
  ViewPropTypes,
  RefreshControl,
  View,
  Image,
  Text,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import {
  LoaderViewApi,
  BottomLoaderViewApi,
  BottomErrorViewApi,
  ErrorViewApi,
  EmptyViewApi,
} from "../ApiViews";
import { Util, DataHandler } from "../../utils";
import { AppStyles, Colors, Metrics } from "../../theme";
import { LIMIT } from "../../config/WebService";
// import Animated from 'react-native-reanimated';
import { getRequestFlag } from "../../ducks/requestFlags";
import { ShimmerView } from "../ShimmerView";

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
class FlatListApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myLoader: true,
      myLoaderAfterApi: false,
      realData: [],
      dummyData: [
        {
          login: "imran",
          id: 7952662,
          node_id: "MDQ6VXNlcjc5NTI2NjI=",
          avatar_url: "https://avatars.githubusercontent.com/u/7952662?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/imran",
          html_url: "https://github.com/imran",
          followers_url: "https://api.github.com/users/imran/followers",
          following_url:
            "https://api.github.com/users/imran/following{/other_user}",
          gists_url: "https://api.github.com/users/imran/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/imran/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/imran/subscriptions",
          organizations_url: "https://api.github.com/users/imran/orgs",
          repos_url: "https://api.github.com/users/imran/repos",
          events_url: "https://api.github.com/users/imran/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/imran/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
        },
        {
          login: "imran",
          id: 7952662,
          node_id: "MDQ6VXNlcjc5NTI2NjI=",
          avatar_url: "https://avatars.githubusercontent.com/u/7952662?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/imran",
          html_url: "https://github.com/imran",
          followers_url: "https://api.github.com/users/imran/followers",
          following_url:
            "https://api.github.com/users/imran/following{/other_user}",
          gists_url: "https://api.github.com/users/imran/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/imran/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/imran/subscriptions",
          organizations_url: "https://api.github.com/users/imran/orgs",
          repos_url: "https://api.github.com/users/imran/repos",
          events_url: "https://api.github.com/users/imran/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/imran/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
        },
        {
          login: "imran",
          id: 7952662,
          node_id: "MDQ6VXNlcjc5NTI2NjI=",
          avatar_url: "https://avatars.githubusercontent.com/u/7952662?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/imran",
          html_url: "https://github.com/imran",
          followers_url: "https://api.github.com/users/imran/followers",
          following_url:
            "https://api.github.com/users/imran/following{/other_user}",
          gists_url: "https://api.github.com/users/imran/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/imran/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/imran/subscriptions",
          organizations_url: "https://api.github.com/users/imran/orgs",
          repos_url: "https://api.github.com/users/imran/repos",
          events_url: "https://api.github.com/users/imran/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/imran/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
        },
      ],
      initialData: [
        {
          login: "imran",
          id: 7952662,
          node_id: "MDQ6VXNlcjc5NTI2NjI=",
          avatar_url: "https://avatars.githubusercontent.com/u/7952662?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/imran",
          html_url: "https://github.com/imran",
          followers_url: "https://api.github.com/users/imran/followers",
          following_url:
            "https://api.github.com/users/imran/following{/other_user}",
          gists_url: "https://api.github.com/users/imran/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/imran/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/imran/subscriptions",
          organizations_url: "https://api.github.com/users/imran/orgs",
          repos_url: "https://api.github.com/users/imran/repos",
          events_url: "https://api.github.com/users/imran/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/imran/received_events",
          type: "User",
          site_admin: false,
          score: 1.0,
        },
      ],
    };
  }

  static propTypes = {
    requestAction: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    payload: PropTypes.object,
    pageKey: PropTypes.string,
    limit: PropTypes.number,
    loaderView: PropTypes.func,
    skeletonView: PropTypes.func,
    skeletonViewHeight: PropTypes.number,
    errorView: PropTypes.func,
    bottomLoaderView: PropTypes.func,
    bottomErrorView: PropTypes.func,
    ListFooterComponent: PropTypes.func,
    emptyView: PropTypes.func,
    identifier: PropTypes.any,
    sendRequestOnMount: PropTypes.bool,
    showOnly: PropTypes.bool,
    showScrollIndicator: PropTypes.bool,
    url: PropTypes.object,
    contentContainerStyle: ViewPropTypes.style,
    listStyle: ViewPropTypes.style,
    filters: PropTypes.object,
    disableLoadMore: PropTypes.bool,
    actionType: PropTypes.string.isRequired,
    selectorData: PropTypes.func.isRequired,
    selectorItem: PropTypes.func,
    isAnimated: PropTypes.bool,
    onWhite: PropTypes.bool,
  };

  static defaultProps = {
    limit: LIMIT,
    loaderView: undefined,
    errorView: undefined,
    bottomLoaderView: undefined,
    bottomErrorView: undefined,
    identifier: undefined,
    sendRequestOnMount: true,
    showOnly: false,
    pageKey: "",
    showScrollIndicator: false,
    payload: {},
    url: undefined,
    emptyView: undefined,
    contentContainerStyle: {},
    listStyle: {},
    filters: {},
    disableLoadMore: false,
    selectorItem: undefined,
    onWhite: false,
  };

  componentDidMount() {
    console.log("_sendRequestFirstTime");
    if (this.props.sendRequestOnMount) {
      this._sendRequestFirstTime();
    }

    // setTimeout(() => {
    //   this.setState({ myLoader: !this.state.myLoader });
    //   // this.setState({ dummyData: [...this.state.initialData,...this.state.initialData,...this.state.initialData] });
    // }, 500);

    // setTimeout(() => {
    //   this.setState({
    //     realData: [
    //       {
    //         login: "imran",
    //         id: 7952662,
    //         node_id: "MDQ6VXNlcjc5NTI2NjI=",
    //         avatar_url: "https://avatars.githubusercontent.com/u/7952662?v=4",
    //         gravatar_id: "",
    //         url: "https://api.github.com/users/imran",
    //         html_url: "https://github.com/imran",
    //         followers_url: "https://api.github.com/users/imran/followers",
    //         following_url:
    //           "https://api.github.com/users/imran/following{/other_user}",
    //         gists_url: "https://api.github.com/users/imran/gists{/gist_id}",
    //         starred_url:
    //           "https://api.github.com/users/imran/starred{/owner}{/repo}",
    //         subscriptions_url:
    //           "https://api.github.com/users/imran/subscriptions",
    //         organizations_url: "https://api.github.com/users/imran/orgs",
    //         repos_url: "https://api.github.com/users/imran/repos",
    //         events_url: "https://api.github.com/users/imran/events{/privacy}",
    //         received_events_url:
    //           "https://api.github.com/users/imran/received_events",
    //         type: "User",
    //         site_admin: false,
    //         score: 1.0,
    //       },
    //     ],
    //   });
    // }, 3000);
  }

  componentDidUpdate(prevProps) {
    const { requestFlags, data, filters, payload } = this.props;
    const { failure, errorMessage, loading } = requestFlags;

    // set boolean for first time refresh so do not add view at bottom
    if (!failure && !loading && data.length > 0) {
      this.isFirstTimeRefreshed = true;
    }

    if (failure && data.length > 0) {
      Util.showMessage(errorMessage);
    }

    if (
      Util.compareDeep(prevProps.filters, filters) ||
      Util.compareDeep(prevProps.payload, payload)
    ) {
      this._sendRequest(true, false, 1, true);
    }
  }

  isFirstTimeRefreshed = false;
  nextPage = 1;

  _sendRequest = (
    reset = false,
    isPullToRefresh = false,
    nextPage = 1,
    isResetData = false
  ) => {
    const {
      requestAction,
      limit,
      payload,
      identifier,
      showOnly,
      url,
      filters,
    } = this.props;

    if (showOnly) {
      return;
    }
    const requestPayload = { ...payload, ...filters, resultsPerPage: limit };

    if (nextPage !== 0) {
      requestPayload.page = nextPage;
      requestPayload.per_page = 10;
    }

    const { dispatch } = DataHandler.getStore();

    const payloadAction = {
      payloadApi: requestPayload,
      reset,
      isPullToRefresh,
      isResetData,
    };
    if (identifier) {
      payloadAction.identifier = identifier;
    }
    if (url) {
      payloadAction.url = url;
    }

    dispatch(requestAction(payloadAction));
  };

  _onEndReached = () => {
    const { requestFlags, data, disableLoadMore, limit } = this.props;
    const { page, loading, lastRecordsLength, failure } = requestFlags;
    const dataLength = data.length;
    console.log(this.props, "this.props");
    const recordsFinished = lastRecordsLength < limit;
    const { totalRecords } = page;
    const sendRequestOnEnd =
      !loading &&
      dataLength < totalRecords &&
      this.isFirstTimeRefreshed &&
      disableLoadMore === false &&
      recordsFinished === false &&
      failure === false;

    if (sendRequestOnEnd) {
      this._sendRequestLoadMore();
    }
  };

  _sendRequestFirstTime = () => {
    this._sendRequest(true);
  };

  _sendRequestLoadMore = () => {
    console.log(this.nextPage, "next page");
    this._sendRequest(false, false, this.nextPage);
  };

  _onRefresh = () => {
    this._sendRequest(true, true);
  };

  _renderApiFooter = () => {
    const { data, requestFlags, showOnly } = this.props;
    const { loading, isPullToRefresh, failure, reset } = requestFlags;

    const totalRecords = requestFlags.totalRecords || 0;

    if (requestFlags.nextPage) {
      this.nextPage = requestFlags.nextPage;
    }

    const showBottomLoader =
      !showOnly &&
      loading &&
      !isPullToRefresh &&
      !reset &&
      data.length > 0 &&
      this.isFirstTimeRefreshed;
    const showBottomError =
      !showOnly &&
      !loading &&
      !isPullToRefresh &&
      !reset &&
      data.length > 0 &&
      data.length < totalRecords &&
      failure &&
      this.isFirstTimeRefreshed;

    if (showBottomLoader) {
      return this._renderBottomLoader();
    }
    if (showBottomError) {
      return this._renderBottomError();
    }

    return null;
  };

  _renderListFooterComponent = () => {
    return [this.props.ListFooterComponent?.(), this._renderApiFooter()];
  };

  _renderBottomError = () => {
    const { bottomErrorView, requestFlags } = this.props;
    const { errorMessage } = requestFlags;

    if (bottomErrorView) {
      return bottomErrorView(errorMessage, this._sendRequestLoadMore);
    }

    return (
      <BottomErrorViewApi
        errorMessage={errorMessage}
        onPressRetry={this._sendRequestLoadMore}
      />
    );
  };

  _renderBottomLoader = () => {
    const { bottomLoaderView } = this.props;

    if (bottomLoaderView) {
      return bottomLoaderView();
    }

    return <BottomLoaderViewApi />;
  };

  _shimmerItem = ({ item, index }) => {
    return (
      <ShimmerView
        shimmerStyle={{
          marginTop: 10,
          width: Metrics.screenWidth - 40,
          height: this.props.skeletonViewHeight,
          borderRadius: 20,
          backgroundColor: "rgba(255,255,255,1)",
          justifyContent: "center",
        }}
        childs={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70 / 2,
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
                // source={{ uri: avatar_url }}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text>{"Name: "}</Text>
              <Text>{"Id: "}</Text>
              <Text>{"Node Id: "}</Text>
            </View>
          </View>
        }
      />
    );
  };

  _renderLoaderView = () => {
    const { loaderView } = this.props;

    if (loaderView) {
      return loaderView();
    }

    // return (
    //   <View
    //     style={{
    //       // height: 10,
    //       backgroundColor: "red",
    //     }}
    //   />
    // );

    // return <LoaderViewApi />;

    return (
      <FlatList
        data={[{}, {}, {}, {}, {}, {}]}
        renderItem={this._shimmerItem}
      />
    );
  };

  _renderErrorView = () => {
    const { errorView, requestFlags } = this.props;
    const { errorMessage } = requestFlags;

    if (errorView) {
      return errorView(errorMessage, this._sendRequestFirstTime);
    }

    return (
      <ErrorViewApi
        onWhite={this.onWhite}
        errorMessage={errorMessage}
        onPressRetry={this._sendRequestFirstTime}
      />
    );
  };

  _renderEmptyView = () => {
    
    const { emptyView, showOnly, requestFlags, isAnimated, data } = this.props;
    console.log('============ Data =======');
    console.log(data);
    const { loading, failure, isPullToRefresh } = requestFlags;

    const showLoading = loading && !isPullToRefresh && data?.length === 0;
    const showError = failure && data.length === 0;

    if (showLoading) {
      return this._renderLoaderView();
    }

    if (showError) {
      return this._renderErrorView();
    }

    if (emptyView) {
      return emptyView();
    }

    return <EmptyViewApi />;
  };

  _renderFlatListComponents() {
    const {
      requestAction,
      requestFlags,
      payload,
      pageKey,
      limit,
      data,
      loaderViewApi,
      showOnly,
      emptyView,
      bottomLoaderView,
      bottomErrorView,
      identifier,
      sendRequestOnMount,
      forwardedRef,
      contentContainerStyle,
      listStyle,
      showScrollIndicator,
      ListFooterComponent,
      filters,
      itemsData,
      renderItem,
      selectorItem,
      itemKey,
      isAnimated = false,
      ...rest
    } = this.props;

    const { loading, failure, isPullToRefresh } = requestFlags;

    const showLoading = loading && !isPullToRefresh && data.length === 0;
    const showError = failure && data.length === 0;

    // console.log(loading, !isPullToRefresh, data.length === 0);

    if (this.state.myLoader) {
      // return this._renderLoaderView();
    }

    if (showError) {
      return this._renderErrorView();
    }

    return (
      <FlatList
        style={[{ flex: 1 }, listStyle]}
        data={data}
        // data={data}
        ref={forwardedRef}
        refreshControl={
          <RefreshControl
            refreshing={isPullToRefresh || false}
            onRefresh={this._onRefresh}
            tintColor={Colors.orange}
            colors={[Colors.orange]}
          />
        }
        onEndReached={this._onEndReached}
        ListFooterComponent={this._renderListFooterComponent}
        keyboardShouldPersistTaps="handled"
        onEndReachedThreshold={0.1}
        extraData={loading}
        ListEmptyComponent={this._renderEmptyView}
        contentContainerStyle={
          !data.length
            ? [AppStyles.flex1]
            : [AppStyles.flatlistContentContainer, contentContainerStyle]
        }
        showsVerticalScrollIndicator={showScrollIndicator}
        showsHorizontalScrollIndicator={showScrollIndicator}
        renderItem={
          itemsData !== 1
            ? ({ item }) =>
                renderItem({
                  item: itemsData?.[itemKey ? item[itemKey] : item] ?? {},
                })
            : renderItem
        }
        {...rest}
      />
    );
  }

  render() {
    return <React.Fragment>{this._renderFlatListComponents()}</React.Fragment>;
  }
}

const mapStateToProps = (store, ownProps) => {
  const requestFlagIdentifier = ownProps.identifier
    ? `${ownProps.actionType}_${ownProps.identifier}`
    : ownProps.actionType;
  return {
    requestFlags: getRequestFlag(requestFlagIdentifier)(store),
    data:
      ownProps.data && _.isArray(ownProps.data)
        ? ownProps.data
        : ownProps.identifier
        ? ownProps.selectorData(ownProps.identifier)(store)
        : ownProps.selectorData(store),
    itemsData: ownProps.selectorItem ? ownProps.selectorItem(store) : 1,
  };
};

export default connect(mapStateToProps, null)(FlatListApi);
