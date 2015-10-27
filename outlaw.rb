OUTLAW_VERSION = ''

class Outlaw < Formula
  desc ""
  homepage ""
  url "https://github.com/hooroo/outlaw/releases/download/#{OUTLAW_VERSION}/outlaw"
  version OUTLAW_VERSION
  sha256 "1aa1b1483ad8ff0eb25af239e67c8c729ef74060eea5460ac1733965f4db08ba"

  depends_on 'docker'
  depends_on 'docker-machine'

  def install
  end

  test do
    # `test do` will create, run in and delete a temporary directory.
    #
    # This test will fail and we won't accept that! It's enough to just replace
    # "false" with the main program this formula installs, but it'd be nice if you
    # were more thorough. Run the test with `brew test outlaw`. Options passed
    # to `brew install` such as `--HEAD` also need to be provided to `brew test`.
    #
    # The installed folder is not in the path, so use the entire path to any
    # executables being tested: `system "#{bin}/program", "do", "something"`.
    system "false"
  end
end
