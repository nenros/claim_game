defmodule ClaimGameWeb.GamesChannelTest do
  use ClaimGameWeb.ChannelCase

  setup do
    {:ok, _, socket} =
      socket(ClaimGameWeb.UserSocket, "user_id", %{some: :assign})
      |> subscribe_and_join(ClaimGameWeb.GamesChannel, "games:lobby")

    {:ok, socket: socket}
  end

end
