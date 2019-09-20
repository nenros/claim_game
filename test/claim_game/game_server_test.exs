defmodule ClaimGame.GameServerTest do
  use ExUnit.Case

  alias ClaimGame.GameServer

  @moduletag :capture_log

  doctest GameServer

  test "should init server with empty player list" do
    {:ok, state } = GameServer.init([])
    assert %{players: []} = state
  end

  describe "#add_player/2" do

  end

  describe "#remove_player/1" do

  end
end
