import React from "react";
import { ApplicationListContent } from "./ApplicationListContent";
import { QueryClient, QueryClientProvider } from "react-query";
import type { Post } from "./types";
import useFetchNextPage from "./api";

interface IColumn {
  name: string;
  label: string;
}

interface Props {
  columns: Array<IColumn>;
  items: Array<Post>;
  onApplicationStatusChanged?: (
    application: Post,
    newStatus: string
  ) => Promise<void>;
  onPreviewApplication?: (application: Post) => void;
  onLoadMore?: () => void;
}

const queryClient = new QueryClient();

const ApplicationsKanban: React.FC<Props> = (props) => {
  const {
    columns,
    items: initialItems,
    onApplicationStatusChanged,
    onLoadMore,
    onPreviewApplication,
  } = props;
  const [items, setItems] = React.useState<Post[]>(initialItems); // Initialize items from props

  const { fetchNextPage } = useFetchNextPage();

  const handleLoadMore = async () => {
    // Fetch next page of data
    const newItems = await fetchNextPage();
    if (newItems && newItems.length > 0) {
      // Add newItems to the existing items
      setItems((prevItems) => [...prevItems, ...newItems]);
      if (onLoadMore) {
        onLoadMore(); // Call onLoadMore if it's provided
      }
    }
  };

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ApplicationListContent
          posts={items}
          refetch={handleLoadMore}
          onPreviewApplication={onPreviewApplication}
          onLoadMore={handleLoadMore}
          onApplicationStatusChanged={onApplicationStatusChanged}
        />
      </QueryClientProvider>
    </div>
  );
};

export default ApplicationsKanban;
